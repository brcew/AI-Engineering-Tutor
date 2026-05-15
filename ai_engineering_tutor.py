import json
from groq import Groq
import tiktoken

# =========================
# CONFIG
# =========================

API_KEY = "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"

client = Groq(api_key=API_KEY)

MODEL = "llama-3.3-70b-versatile"

# =========================
# SYSTEM PROMPT
# =========================

messages = [
    {
        "role": "system",
        "content": "You are an AI Engineering tutor"
    }
]

# =========================
# TOKEN COUNTER
# =========================

def count_tokens(messages_list):
    try:
        encoding = tiktoken.get_encoding("cl100k_base")
    except:
        encoding = tiktoken.encoding_for_model("gpt-4")

    total_tokens = 0

    for msg in messages_list:
        total_tokens += len(encoding.encode(msg["content"]))

    return total_tokens

# =========================
# SAVE CHAT
# =========================

def save_conversation(filename="conversation.json"):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(messages, file, indent=4)

    print(f"\nConversation saved to {filename}")

# =========================
# CHAT LOOP
# =========================

print("=" * 50)
print("AI Engineering Tutor Chat")
print("Type 'quit' to exit")
print("=" * 50)

while True:

    user_input = input("\nYou: ")

    # Exit condition
    if user_input.lower() == "quit":
        save_conversation()
        print("Goodbye!")
        break

    # Add user message
    messages.append({
        "role": "user",
        "content": user_input
    })

    # Token count after user message
    user_tokens = count_tokens(messages)
    print(f"\n[Token Count After User Message: {user_tokens}]")

    try:
        # API call
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages
        )

        assistant_reply = response.choices[0].message.content

        # Add assistant response to history
        messages.append({
            "role": "assistant",
            "content": assistant_reply
        })

        # Clean response printing
        print("\nTutor:")
        print("-" * 50)
        print(assistant_reply)
        print("-" * 50)

        # Token count after assistant response
        total_tokens = count_tokens(messages)
        print(f"\n[Total Conversation Tokens: {total_tokens}]")

    except Exception as e:
        print("\nError:")
        print(e)