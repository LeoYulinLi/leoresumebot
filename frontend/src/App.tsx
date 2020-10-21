import React, { useEffect, useRef, useState } from 'react';
import { generateGuid } from "./utils/botkit-utils";
import "./App.scss"
import { Button, Card, Container, Form, FormControl, InputGroup } from "react-bootstrap";
import ReactMarkdown from 'react-markdown'

interface Message {
  user?: string,
  text: string
}

function App() {

  const socket = useRef(new WebSocket("ws://localhost:3000"))

  const guid = useRef(generateGuid())

  const [input, setInput] = useState("")

  const [history, setHistory] = useState<Message[]>([{ text: "hi" }])

  useEffect(() => {
    socket.current.addEventListener("open", ev => {
      console.log("connected")
      socket.current.send(JSON.stringify({
        type: "message",
        text: "hello",
        channel: "web_socket",
        user: guid
      }));
    })

    socket.current.addEventListener("message", ev => {
      const data: { type: string, text: string } = JSON.parse(ev.data)
      setHistory(prev => [{ user: "bot", text: data.text }, ...prev])
    })
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault()
    if (!input) return
    socket.current.send(JSON.stringify({
      type: "message",
      text: input,
      channel: "web_socket",
      user: guid
    }))
    setHistory(prev => [{ text: input }, ...prev])
    setInput("")
  }

  return (
    <Container className="chat-container">
      <Card className="chat-history my-2">
        <Card.Body>{ history.map(it => (
          <div className={ it.user ? "other" : "me" }>
            <div className="bubble">
              { it.user ? (<ReactMarkdown>{ it.text }</ReactMarkdown>) : it.text  }
            </div>
          </div>
        )) }</Card.Body>
      </Card>
      <Form onSubmit={ handleSubmit }>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="What are some of your work experience?"
            aria-label="Message"
            aria-describedby="basic-addon2"
            value={ input }
            onChange={ event => setInput(event.target.value) }
          />
          <InputGroup.Append>
            <Button type="submit" variant="primary">Button</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default App;
