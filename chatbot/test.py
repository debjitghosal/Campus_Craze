import os
import time
from dotenv import load_dotenv

import streamlit as st
import google.generativeai as genai

# 1) Load .env and configure API key
load_dotenv("google_api.env")
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise RuntimeError("Missing GOOGLE_API_KEY in .env")
genai.configure(api_key=api_key)

# 2) Initialize the correct Gemini model
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro")

# 3) Streamlit UI setup
st.set_page_config(page_title="Gemini Chatbot", page_icon="💬", layout="centered")
st.title("🤖 Gemini Chatbot (Streaming)")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

# Display existing chat
for msg in st.session_state.chat_history:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Get user prompt
user_prompt = st.chat_input("Ask Gemini…")
if user_prompt:
    # show user message
    st.chat_message("user").markdown(user_prompt)
    st.session_state.chat_history.append({"role": "user", "content": user_prompt})

    # prepare assistant placeholder
    with st.chat_message("assistant"):
        placeholder = st.empty()
        full_text = ""

        # stream=True returns a generator of partial responses
        for partial in model.generate_content(user_prompt, stream=True):
            # extract the new chunk of text
            chunk = partial.candidates[0].content.parts[0].text
            full_text += chunk
            # update the placeholder with the accumulated text
            placeholder.markdown(full_text)
            # tiny sleep to make it feel smoother
            time.sleep(0.01)

    # save the completed assistant reply
    st.session_state.chat_history.append({"role": "assistant", "content": full_text})
