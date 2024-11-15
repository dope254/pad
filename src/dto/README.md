I want to create an app using next js for both my frontend and backend requirements. But right now im building the frontend using react. I need to simulate the backend - i have sample data, for backend domain services we will only return true/or pass or something to show that the function was called as required.

since we are combining both frontend an backend, we will have only one app service.

there is several app services I want to simulate:

content generation 

[get_template -> get_context -> generate_prompts -> generate_content -> update_content]

CRUD operations on data 

[cud - methods in entities, R in repositories]

ie entities manage their creation, updating and deletions

repositories manage read

---

we will be focusing more on read

---

we have two entities : project and artifact, and value objects: prompt and prompt template:

ill provide the code which is currently in python for these domain objects:

---

right now I just want the read part to work because i need to display content on the screen - but i need to simulate it:

i have some components:

