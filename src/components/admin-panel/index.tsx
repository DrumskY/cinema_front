import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import './style.css';

const Administration = () => {
    const [activeDiv, setActiveDiv] = useState("");
    const accessToken = window.localStorage.getItem("accessToken");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [movietime, setMovietime] = useState("");
    const [direction, setDirection] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagedesc, setImagedesc] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.files?.[0] ? e.target.files[0] : null);
    };

    const handleImageDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImagedesc(e.target.files ? e.target.files[0] : null);
    };

    const addFilmHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        const formDataDesc = new FormData();
        image ? formData.append('image', image) : null
        imagedesc ? formDataDesc.append('image', imagedesc) : null
        console.log(image?.name)
        console.log(imagedesc?.name)
        try {
          await axios.post(`${process.env.REACT_APP_SERVER_BASE}admin/addimage`, formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('Image uploaded successfully');
        } catch (err) {
          console.error(err);
        }

        try {
            await axios.post(`${process.env.REACT_APP_SERVER_BASE}admin/addimagedesc`, formDataDesc, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Image-Desc uploaded successfully');
          } catch (err) {
            console.error(err);
          }
  
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_SERVER_BASE}admin/addmovie`,
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            data: {
                name,
                type,
                movietime,
                direction,
                image: image?.name,
                imagedesc: imagedesc?.name,
                rating,
                description,
            },
        })
            .then(({data}) => {
                if (data.ok) {
                    console.log("Film success added");
                }
                else {
                    console.log(data);
                    window.location.reload()
                }
            })
            .catch((e: AxiosError) => {
                if (e.response && e.response.data) {
                    console.log(e.response.data);
                }
                    console.log("Sadge");
            });
    };

    const handleClick = (divName: string) => {
        setActiveDiv(divName);
    };

    return (
        <div className="main-admin">
            <div className="contener-admin">
                <div className="menu-admin"><h2 onClick={() => handleClick("film")}>Dodaj film</h2></div>
                <div className="menu-admin"><h2 onClick={() => handleClick("repertuar")}>Dodaj repertuar</h2></div>
            </div>
            <div className='content-admin'>
            {activeDiv === "film" && (
                <div>
                    <div className='form-wrapper-admin'>
             <h2>Dodaj film</h2>
             <form onSubmit={addFilmHandler}>
                <div className='name'>
                   <label htmlFor="name">Nazwa</label>
                   <input 
                     type='text'
                     value={name}
                     name='name'
                     required
                     placeholder='Nazwa filmu'
                     onChange={(e) => setName(e.currentTarget.value)}
                      />
                </div>
                <div className='type'>
                   <label htmlFor="type">Gatunek</label>
                   <input 
                     type='text' 
                     value={type}
                     required
                     name='type'
                     placeholder='Gatunek'
                     onChange={(e) => setType(e.currentTarget.value)}
                     />
                </div>
                <div className='movietime'>
                   <label htmlFor="movietime">Czas trwania seansu</label>
                   <input 
                     type='text' 
                     value={movietime}
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='movietime'
                     placeholder='Czas trwania seansu (min)'
                     onChange={(e) => setMovietime(e.currentTarget.value)}
                     />
                </div> 
                <div className='direction'>
                   <label htmlFor="direction">Reżyseria</label>
                   <input 
                     type='text' 
                     value={direction}
                     required
                     name='direction'
                     placeholder='Reżyseria'
                     onChange={(e) => setDirection(e.currentTarget.value)}
                     />
                </div>            
                <div className='image'>
                   <label htmlFor="image" className='drop-title'>Zdjęcie</label>
                   <input 
                     type='file' 
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='image'
                     placeholder='Ikona'
                     onChange={handleImageChange}
                     />
                </div>       
                <div className='imgdesc'>
                   <label htmlFor="imgdesc" className='drop-title'>Zdjęcie opisowe</label>
                   <input 
                     type='file' 
                     pattern="[a-zA-Z0-9-]+"
                     required
                     name='imgdesc'
                     placeholder='Zdjęcie'
                     onChange={handleImageDescChange}
                     />
                </div>  
                <div className='rating'>
                   <label htmlFor="rating">Ocena filmu</label>
                   <input 
                     type='text' 
                     value={rating}
                     required
                     name='rate'
                     placeholder='Ocena'
                     onChange={(e) => setRating(e.currentTarget.value)}
                     />
                </div> 
                <div className='desc'>
                   <label htmlFor="desc">Opis</label>
                      <textarea 
                            value={description}
                            placeholder='Opis'
                            required
                            name="Opis"
                            minLength={10}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                            ></textarea>
                </div>   
                <div className='submit'>
                   <button className='save-movie-btn' type='submit'>Zapisz</button>
                </div>
           </form>
       </div>
                </div>
            )}
            {activeDiv === "repertuar" && (
                <div>
                    This is the content for the "Dodaj repertuar" div
                </div>
            )}
            </div>
        </div>
    )
};

export default Administration;