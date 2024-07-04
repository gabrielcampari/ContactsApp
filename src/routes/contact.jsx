import { Form, useLoaderData } from "react-router-dom"; 
import { getContact } from "../contacts";

export async function loader({params}){
  const contact = await getContact(params.contactId);
  return {contact};
}

export default function Contact(){
  const { contact } = useLoaderData(); 
/*   const contact = {
  first: "Gabriel", 
  last: "Campari", 
  avatar: "https://robohash.org/you.png?size=200x200",
  twitter: "campari_gabriel",
  notes: "Olá Mundo!",
  favorite: true, 

  };  */

  return (
    <div id="contact">
      <div> 
        <img
        key = {contact.avatar}
        src = {
          contact.avatar ||
          `https://robohash.org/${contact.id}.png?size=200x200`
        }
        />
      </div>
      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
            {contact.first} {contact.last}
            </>
          ) : (
            <i>Nenhum nome</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a
            target="_blank"
            href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div> 
          <Form action="edit">
            <button type="subtmit">Editar</button>
          </Form>
          <Form
          method="post"
          action="destroy"
          onSubmit={(event) => {
            if(
              !confirm(
                "Por favor confirme que você deseja deletar este registro."
              )
            ) {
              event.preventDefault();
            }
          }}
          >
            <button type="submit">Deletar</button>
          </Form>
        </div>
      </div>
    </div>
  );
} 

function Favorite({ contact }) {
  const favorite = contact.favorite;
  return (
    <Form method="post">
      <button
      name="favorite"
      value={favorite ? "false" : "true"}
      aria-label={
        favorite
        ? "Remova dos favoritos"
        : "Adicione aos favoritos"
      }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  ); 
}