import { useState  } from "react";

export default function MyForm() {

    const [formInputs, setFormInput] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
    });


    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://127.0.0.1:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(formInputs),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success', data);
        })
        .catch((error) => {
            console.log('Error', error);
        });
    };


    return (
        <div className="outStyle">

            
            <form className="fromStyle"
            onSubmit={handleSubmit}
            >

                <h2 style={{textAlign: "center"}}>Here you can change data</h2>
                <hr style={{border: "2px solid orange", width: "99%"}}></hr>
            
                <label className="active">Name: </label>
                <input className="active"
                type="text"
                name="name"
                placeholder="Enter product name"
                required
                value={formInputs.name || ""}
                onChange={(event) => {
                    setFormInput({...formInputs, name: event.target.value});
                }}
                />

                <label className="active">Price: </label>
                <input className="active"
                type="number"
                name="price"
                placeholder="Enter product price"
                required
                value={formInputs.price || ""}
                onChange={(event) => {
                    setFormInput({...formInputs, price: event.target.value > 0 
                        ? event.target.value : ""});
                }}
                />

                <label className="active">Category: </label>
                <input className="active"
                type="text"
                name="category"
                placeholder="Enter product category"
                required
                value={formInputs.category || ""}
                onChange={(event) => {
                    setFormInput({...formInputs, category: event.target.value});
                }}
                />

                <label className="active">Description: </label>
                <input className="active"
                type="text"
                value={formInputs.description || ""}
                onChange={(event) => {
                    setFormInput({...formInputs, description: event.target.value});
                }}
                />

                <button className="active click">Submit</button>
            </form>
        </div>

    );
};
