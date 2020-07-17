/// <reference types="cypress" />
describe("todo actions", () => {
  it.only("should add a new todo to the list", () => {
    cy.visit("http://todomvc-app-for-testing.surge.sh/");
    cy.get(".new-todo", { timeout: 6000 }).type("Wash dishes{enter}");
    cy.get("label").should("have.text", "Wash dishes");
    cy.get(".toggle").should("not.be.checked");
  });

  it("should mark a todo as completed", () => {
    cy.visit("http://todomvc-app-for-testing.surge.sh/");
    cy.get(".toggle").click();
    cy.get("label").should("have.css", "text-decoration-line", "line-through");
  });

  it("should clear completed todos", () => {
    cy.contains("Clear completed").click();
    cy.get(".todo-list").should("not.have.descendants", "li");
  });
});
