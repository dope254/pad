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

Chatbox: for chatting with AI - in charge of coordinating content generation workflow

UserStoryCards: for displaying stakeholder name, user story, button (icon) (top right) {<FontAwesomeIcon icon="fa-light fa-circle-exclamation" />} for displaying a pop up on more info about the stakeholder, button for displaying bdd gherkin (bottom right)

Grid: for displaying active items:
    active user story card:
        empathy maps
        value propositions
        BDD Gherkin
        -> 3 cols 

    process models:
        BPMN diagrams 
        a service task can be either domain service or external service
        it will be collapsed in bpmn, when expanded one should be able to see the subprocess
        for domain service is all about coordination of entity methods
        when you select an entity method, a pop code-panel will appear with the codes for that method
        

    data models:
        class diagrams

    ---

    the question is, can we render bpmn and class diagrams using our own tools
    class diagrams is easy (you just need to define the containers) - problem is showing the relations

    for bpmn, we could automate conversion of json to bpmn xml using automation tools: we just need to render it using BPMN js - we also get a chance to add styling the entity method (bpmn artifact) - so that it shows code

    we will render the bpmn js as an iframe - with a transparent background : because of using react version, we will use the html version

    




    


