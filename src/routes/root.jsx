import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import { getContacts, createContact } from "../contact"; 

export async function loader() {
  const contact = await getContacts();
  return { contact };
}

export async function action() {
  const contact = await createContact();
  return { contact };
}

export default function Root() {
  const {contact} = useLoaderData(); 
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contact"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <Form method="post">
            <button type="submit">Novo</button>
          </Form>
        </div>
        <nav>
          {contact.length ? ( 
          <ul>
            {contact.map((contact) => ( 
            <li key={contact.id}>
              <Link to ={`contact/${contact.id}`}>
                {contact.first || contact.last ? (
                  <>
                  {contact.first} {contact.last}
                  </>
                ) : ( 
                  <i>Nenhum nome</i>
                )}{" "}
                {contact.favorite && <span>★</span>}
              </Link>
            </li>
          ))}
          </ul>
          ) : (
          <p>
            <i>Sem contatos</i>
          </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
