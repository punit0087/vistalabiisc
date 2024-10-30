import Image from "next/image";
import Clogo from "@/assets/contact.svg";
import Loc from "@/assets/location.svg";
import mail from "@/assets/mail-2.svg";

export default function FrontC() {
  // const [name, setName] = useState<string>("");
  // const [email, setEmail] = useState<string>("");
  // const [message, setMessage] = useState<string>("");
  // const [error, setError] = useState<string>("");

  // const validateEmail = (email: string): boolean => {
  //   return email.includes("@") && email.includes(".");
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent page refresh

  //   if (!name || !email || !message) {
  //     setError("All fields are required.");
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     setError("Please enter a valid email address.");
  //     return;
  //   }

  //   setError("");

  //   const response = await fetch("/contactus/api", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, message }),
  //   });

  //   if (response.ok) {
  //     alert("Message sent successfully!");
  //     setName("");
  //     setEmail("");
  //     setMessage("");
  //   } else {
  //     alert("Failed to send the message.");
  //   }
  // };

  return (
    <div className="bg-zinc-900 rounded-xl absolute top-[20%] right-[5%] w-[40%] h-fit sm:w-[90%] sm:top-[70vh] sm:z-40">
      {/* <form onSubmit={handleSubmit} className="flex flex-col">
       
        <input
          className="border border-zinc-300 bg-transparent rounded-md p-8 mb-6"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-zinc-300 bg-transparent rounded-md p-8 mb-6"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="border border-zinc-300 bg-transparent rounded-md p-8 mb-6"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          className="hover:bg-zinc-500 hover:text-black transition p-8 rounded-md"
        >
          Submit
        </button>
      
      </form> */}
      <div className="p-10">
        <div className="flex items-center">
          <h4 className="text-zinc-400 font-bold text-xl mr-2">Contact Us</h4>
          <Image src={Clogo} alt="" className="w-8 h-8"></Image>
        </div>
        <p className="text-zinc-500 text-sm mt-4 mb-6">
          The VISTA lab is led by Dr. Punit Rathore. <br /> He is an Assistant
          Professor at Robert Bosch Centre for Cyber-Physical Systems (RBCCPS)
          at the Indian Institute of Science, Bangalore.
        </p>
        <div className="flex items-center">
          <h5 className="text-zinc-400 font-semibold text-sm mr-2">Address</h5>{" "}
          <Image src={Loc} alt="" className="w-6 h-6"></Image>
        </div>
        <p className="text-zinc-500 mt-2 mb-6 text-xs">
        Robert Bosch Centre for Cyber-Physical Systems (RBCCPS),
         <br />TCS SMART-X Hub (IDR Building) <br /> Indian Institute of Science (IISc) Bangalore
          <br /> Bengaluru - 560012, Karnataka, India
        </p>
        <div className="flex items-center">
          <h5 className="text-zinc-400 font-semibold text-sm mr-2">Email:</h5>{" "}
          <Image src={mail} alt="" className="w-6 h-6"></Image>
        </div>
        <p className="text-zinc-500 text-xs mt-2 mb-4">
          prathore [at] iisc [dot] ac [dot] in
        </p>
        <div className="mt-10">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.2062179827485!2d77.56236107541228!3d13.022535987297559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17004b1dd329%3A0xe6bf7a2bf1fcbc87!2sIDR%20Building!5e0!3m2!1sen!2sin!4v1724412636705!5m2!1sen!2sin"  className="rounded-md w-full"></iframe>
        </div>
      </div>
    </div>
  );
}
