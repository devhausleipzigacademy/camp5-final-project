import axios from "axios";

axios
  .post("http://localhost:3000/api/email", { email })
  .then((res) => {
    alert("Send Mail To You");
    setEmail("");
  })
  .catch((e) => console.log(e));

function setEmail(arg0: string) {
  throw new Error("Function not implemented.");
}

<main>
  <form>
    <input
      type="email"
      placeholder="Enter Mail"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    ></input>
    <button onClick={SendMail}>Send</button>
  </form>
</main>;
