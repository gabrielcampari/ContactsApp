import { Form, useLoaderData, redirect, useNavigate } from  "react-router-dom"; 
import { updateContact } from "../contacts";

export async function action({ request, params }){
  const formData = await request.formData(); 
/*   const firstName = formData.get("first"); 
  const lastName = formData.get("last");  */
  const updates = Object.fromEntries(formData); 
/*   updates.first;
  updates.last;  */
  await updateContact(params.contactId, updates); 
  return redirect(`/contacts/${params.contactId}`); 
}

export default function EditContact() {
  const { contact } = useLoaderData(); 
  const navigate = useNavigate(); 

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Nome</span>
        <input
            placeholder="Primeiro Nome"
            aria-label="First name"
            type="text"
            name="first"
            defaultValue={contact?.first}
          />
          <input
            placeholder="Sobrenome"
            aria-label="twitter"
            type="text"
            name="last"
            defaultValue={contact?.last}
          />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@SeuPerfil"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="URL avatar"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notas</span>
        <textarea
          name="notas"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => {navigate(-1);}}>Cancelar</button>
      </p>
    </Form>
  ); 
}