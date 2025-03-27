import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.tools.retriever import create_retriever_tool
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain.prompts import PromptTemplate

# Load environment variables
load_dotenv()

class InsuranceAgent:
    def __init__(self):
        # Ensure Groq API key is set
        self.groq_api_key = os.getenv('GROQ_API_KEY')
        if not self.groq_api_key:
            raise ValueError("Please set the GROQ_API_KEY environment variable")

        # Wikipedia Tool for general insurance knowledge
        api_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=200)
        self.wiki = WikipediaQueryRun(api_wrapper=api_wrapper)

        # Create a vector store for insurance policy documents
        self._create_vector_store()

        # Initialize LLM and Agent
        self._init_agent()

    def _create_vector_store(self):
        pdf_path = 'policy_document.pdf'
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

        try:
            if os.path.exists(pdf_path):
                loader = PyPDFLoader(pdf_path)
                docs = loader.load()
            else:
                sample_content = """
                Default Insurance Policy Information:
                - Insurance provides financial protection against potential risks
                - Different types of insurance cover various aspects of life
                - Always read and understand your policy terms carefully
                - Consult with insurance professionals for personalized advice
                """
                with open('fallback_policy.txt', 'w') as f:
                    f.write(sample_content)
                loader = TextLoader('fallback_policy.txt')
                docs = loader.load()

            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            documents = text_splitter.split_documents(docs)

            self.vectordb = FAISS.from_documents(documents, embeddings)
            self.retriever = self.vectordb.as_retriever()

            self.retriever_tool = create_retriever_tool(
                self.retriever,
                "insurance_policy_search",
                "Search for detailed information about insurance policies, coverage, and consumer guidelines."
            )

        except Exception as e:
            print(f"Error creating vector store: {e}")
            self.retriever_tool = None

    def _init_agent(self):
        self.tools = [self.wiki]
        if self.retriever_tool:
            self.tools.append(self.retriever_tool)

        self.llm = ChatGroq(
            temperature=0,
            model_name="llama3-8b-8192",
            groq_api_key=self.groq_api_key
        )

        # Updated prompt template to strictly enforce topic relevance
        prompt = PromptTemplate(
            input_variables=["input", "agent_scratchpad"],
            template="""
            You are an AI assistant specialized in **insurance policies only**.
            You **must not** answer any questions unrelated to insurance.
            
            If a question is not about insurance, respond with:  
            "I am only able to provide answers related to insurance policies."

            Use the tools provided to retrieve relevant information when necessary. Be polite and professional in your responses.

            Query: {input}
            {agent_scratchpad}
            Response:
            """
        )

        agent = create_tool_calling_agent(self.llm, self.tools, prompt)
        self.agent_executor = AgentExecutor(agent=agent, tools=self.tools, verbose=True)

    def query(self, question):
        try:
            response = self.agent_executor.invoke({"input": question, "agent_scratchpad": ""})
            output = response.get('output', '')

            # Strict Filtering: If output does not contain insurance-related terms, reject it
            insurance_keywords = ["insurance", "policy", "coverage", "premium", "claim", "deductible", "risk", "benefit", "compensation"]
            if not any(keyword in output.lower() for keyword in insurance_keywords):
                return "I am only able to provide answers related to insurance policies."

            return output

        except Exception as e:
            return f"An error occurred: {str(e)}"

insurance_agent = InsuranceAgent()

def get_agent_response(question):
    return insurance_agent.query(question)
