import {useState} from "react";
const App = () => {
    const [image, setImage] = useState(null);
    const [value, setValue] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");

    const surpriseOptions = [
        "Does the image have a whale?",
        "Is the image fabulously pink?",
        "Does the image have puppies?"
    ]

    const surprise = () => {
        const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
        setValue(randomValue)
    }

    const uploadImage = async (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        setImage(e.target.files[0])
        try{
            const options = {
                method: 'POST',
                body: formData,
            }
            const response = await fetch('http://localhost:8000/upload', options)
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    const analyzerImage = () => {

    }

    const clear = () => {
        setImage(null)
        setValue("")
        setResponse("")
        setError("")
    }

  return (
      <div className="app">
          <section className="search-section">
              <div className="image-container">
                  {image && <img className="image" src={URL.createObjectURL(image)} alt=""/>}
              </div>
              <p className="extra-info">
                  <span>
                      <label htmlFor="files"> upload an image </label>
                      <input id="files" type="file" accept="image/*" hidden onChange={uploadImage}/>
                  </span>
                  to ask questions about.
              </p>
              <p>What do you what to know about the image?
                  <button className="surprise" onClick={surprise} disabled={response}>Surprise me</button>
              </p>
              <div className="input-container">
                  <input
                      placeholder="What is in the image..."
                      value={value}
                      onChange={e => setValue(e.target.value)}
                  />
                  {(!response && !error) && <button onClick={analyzerImage}>Ask me</button>}
                  {(response || error) && <button onClick={clear}>Clear</button>}
              </div>
              {error && <p>{error}</p>}
              {response && <p>{response }</p>}
          </section>
      </div>
  );
}

export default App;
