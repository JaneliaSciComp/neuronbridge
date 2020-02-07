import React from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ListNotes.css";
import SpinnerIcon from "../components/SpinnerIcon";

export default function ListNotes(props) {

  function renderLoading() {
    return (
      <LinkContainer key="new" to="/notes/new">
        <ListGroupItem>
          <SpinnerIcon />
        </ListGroupItem>
      </LinkContainer>
    );
  }

  function renderNotesList(notes) {
    return (
      <>
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
        {notes.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1).map((note, i) =>
            <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
            <ListGroupItem header={note.content.trim().split("\n")[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
            </LinkContainer>
        )}
      </>
    );
  }

  return (
    <div className="notes">
      <PageHeader>Collaborative Notes</PageHeader>
      <ListGroup>
        {props.isLoading && renderLoading()}
        {!props.isLoading && renderNotesList(props.notes)}
      </ListGroup>
    </div>
  );
}