```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: Enters https://studies.cs.helsinki.fi/exampleapp/notes into the navigation bar
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server
```