import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useOutletContext, useParams} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context';

function EditCarPage() {
    const {carId} = useParams();

    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [licensePlate, setLicensePlate] = useState(null);
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const storedToken = localStorage.getItem('authToken');
    const { user } = useContext(AuthContext);
    const [cars, getCarList] = useOutletContext();

    const navigate = useNavigate();


useEffect(() => {
    const currentCar = cars.find(car => car._id == carId)
      setBrand(currentCar.brand)
      setModel(currentCar.model)
      setLicensePlate(currentCar.licensePlate)
      setImage(currentCar.imageUrl)
      setCurrentImage(currentCar.imageUrl)

}, [])

async function defineImage() {
  let imageFile;

  if(image) {
    const data = new FormData()
      data.append("file", image)  
      data.append("upload_preset", "standard")

      let response = await axios.post("  https://api.cloudinary.com/v1_1/dq8uzmgrq/image/upload", data, {headers: { "X-Requested-With": "XMLHttpRequest" }})
      imageFile = response.data.secure_url;

      return imageFile;
  } else {
    imageFile = currentImage;

    return imageFile;
  }
}


    const handleSubmit = (e) => {
      e.preventDefault();

    defineImage()
      .then(response => {

        const newCarDetails = {
            brand,
            model,
            licensePlate,
            imageUrl: response
        }
        return axios.put(`${process.env.REACT_APP_API_URL}/cars/${carId}`, newCarDetails, {headers: { Authorization: `Bearer ${storedToken}`, CurrentUserId: user._id }})
      })  
        .then((response) => {
          getCarList()
          navigate(`/home/cars/${carId}`)
          })
          .catch(error => {
            const errorDescription = error.response.data.message;
            console.log('There was an error editing the information of the car', errorDescription)
            setErrorMessage(errorDescription)
          })
    }

  return (
    <Form onSubmit={handleSubmit}>
    {errorMessage && <Alert key={'danger'} variant={'danger'}>{errorMessage}</Alert>}
  <Form.Group className="mb-3" controlId="formBasicBrand">
    <Form.Label>Brand:</Form.Label>
    <Form.Control required={true} type="text" name='brand' value={brand} onChange={e => {setBrand(e.target.value)}}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicModel">
    <Form.Label>Model</Form.Label>
    <Form.Control required={true} name='model' value={model} type="text" onChange={e => {setModel(e.target.value)}} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicLicensePlate">
    <Form.Label>License Plate</Form.Label>
    <Form.Control required={true} unique="true" name='license Plate' value={licensePlate} type="text" onChange={e => {setLicensePlate(e.target.value)}} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicLicensePlate">
    <Form.Label>Image:</Form.Label>
    <Form.Control name='car-image' type="file" onChange={e => {setImage(e.target.files[0])}}/>
  </Form.Group>

  <Button variant="secondary" type="submit">
    Submit
  </Button>
</Form>
  )
}

export default EditCarPage