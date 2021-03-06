import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FormData from 'form-data';
import ReCAPTCHA from "react-google-recaptcha";
import {Grid, Dialog, Button, DialogContent, FormControl, TextField, CircularProgress} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import '../css/addStoryForm.css';

const styles = {
    dialogPaper: {
    background: 'radial-gradient(#e7e7e4,#dcddd4)',
      color: 'black',
      paddingBottom: '1rem',
      minHeight: '70vh',
      borderRadius: '1rem',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'darkgrey',
        outline: '1px solid slategrey',
        borderRadius: '1rem',
        border: 'none',
        outline: 'none'
      }

    },
    dialogLabel: {
        color: 'black',
        fontSize: '1.3rem'
    },
    input: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    }
  };


function AddStoryForm(props){

    const {addStory, setAddStory, location, classes} = props;

    //Fields States
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
    const [donor, setDonor] = useState('');
    const [instaName, setInstaName] = useState('');
    const [recaptcha, setRecaptcha] = useState(false);

//Error Handling States
    const [fieldsError, setFieldsError] = useState('');
    const [donorErrorMsg, setDonorErrorMsg] = useState('');
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState('');
    const [photosErrorMsgNone, setPhotosErrorMsgNone] = useState('');
    const [photosErrorMsgBigger, setPhotosErrorMsgBigger] = useState('');
    const [recaptchaErrorMsg, setRecaptchaErrorMsg] = useState('');

//Submting Form States
    const [progressScreen, setProgressScreen] = useState(false);
    const [finishProgress, setFinishProgress] = useState(false);
    const [errorProgress, setErrorProgress] = useState(false);


//Fields Handlers
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handlePhotos = (event) => {
        setPhotos(event.target.files);
    }

    const handleDonor = (event) => {
        setDonor(event.target.value);
    }

    const handleInstaName = (event) => {
        setInstaName(event.target.value);
    }

    const sendRequest = (urls, publicIds) => {
        console.log(location);
        const data = {
            location: {type: 'Point', coordinates: [location.location.coordinates[0], location.location.coordinates[1]]},
            name: location.name,
            category: location.category,
            district: location.district,
            description: description,
            photos: {urls: urls,
                publicIds: publicIds},
            donor: donor,
            donorInstagram: instaName,
            comments: [],
            reference: location._id
        }
        axios.post('/api/requests',data).then(res => {
            setFinishProgress(true);
        })
        .catch(err => {
            console.log(err);
            setErrorProgress(true);
        })
    }

    let requestMsg = (<div className='progress-msg'>
        <CircularProgress color='secondary'/>
        <h2>???????? ????????</h2>
        </div>)
            if(finishProgress){
                requestMsg = <div className='progress-msg'>
                    <div class="success-checkmark">
                        <div class="check-icon">
                            <span class="icon-line line-tip"></span>
                            <span class="icon-line line-long"></span>
                            <div class="icon-circle"></div>
                            <div class="icon-fix"></div>
                        </div>
                    </div>
                <h2>?????????? ?????????? ????????????</h2>
                <Button variant="contained" color='primary' onClick={() => {
                    setProgressScreen(false);
                    setFinishProgress(false);
                    setAddStory(false);
                    }}>??????????
                </Button>
            </div>
            }
            if(errorProgress){
                requestMsg = <div className='progress-msg'>
                <div className='container'>
                    <div className="circle-border"></div>
                    <div className="circle">  
                        <div className="error"></div>
                    </div>
                </div>
                <h2>?????????? ??????????, ?????? ?????? ????????</h2>
                <Button variant="contained" color='primary' onClick={() => {
                    setProgressScreen(false);
                    setErrorProgress(false);}}>
                    ??????????
                </Button>
            </div>
            }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!recaptcha || photos.length === 0 || photos.length > 5 || donor == '' || description == ''){
            setFieldsError(<div className='errorMsg'>?????? ?????????? ???????????? ??????????</div>)
            if(!recaptcha){
                setRecaptchaErrorMsg(<div className='errorMsg'>???? ???????? ?????? ????</div>)
            }
            else if(recaptcha){
                setRecaptchaErrorMsg('')
            }

            if(photos.length === 0){
                setPhotosErrorMsgNone(<div className='errorMsg'>???? ???????????? ?????????? ?????????? ??????</div>)
            }
            else if(photos.length != 0){
                setPhotosErrorMsgNone('')
            }

            if(photos.length > 5){
                setPhotosErrorMsgBigger(<div className='errorMsg'>?????? ???????????? ???????? ??-5 ????????????</div>)
            }
            else if(photos.length < 5){
                setPhotosErrorMsgBigger('')
            }

            if(donor ===''){
                setDonorErrorMsg(<div className='errorMsg'>???? ???????? ???? ??????</div>)
            }
            else if(donor != ''){
                setDonorErrorMsg('')
            }

            if(description === ''){
                setDescriptionErrorMsg(<div className='errorMsg'>???? ???????? ?????????? ?????? ?????????? ?????????? ???? ??????????</div>)
            }
            else if(description != ''){
                setDescriptionErrorMsg('')
            }
        }
        else{
            setFieldsError('');
            setRecaptchaErrorMsg('');
            setPhotosErrorMsgBigger('');
            setPhotosErrorMsgNone('');
            setDonorErrorMsg('');
            setDescriptionErrorMsg('');
            const data = new FormData();
            for(const file of photos){
                data.append('image',file)
            }
            data.append('name', location.name);
            setProgressScreen(true);
            axios.post('/api/uploads', data, {headers: {
                'Content-Type': 'multipart/form-data'
              }}).then(res => {
                 // console.log(res.data.urls);
                    sendRequest(res.data.urls, res.data.publicIds);})
            .catch(err => {
                console.log(err);
                setErrorProgress(true);
                });
        }
    }

    const handleExit = () => {
        setFieldsError('');
        setRecaptchaErrorMsg('');
        setPhotosErrorMsgBigger('');
        setPhotosErrorMsgNone('');
        setDonorErrorMsg('');
        setDescriptionErrorMsg('');
        setAddStory(false);
    }

    return(
        <Dialog classes={{ paper: classes.dialogPaper }} open={addStory} fullWidth={true} maxWidth={'md'}>
            <form onSubmit={handleSubmit} style={{direction: 'rtl'}}  className='formContainer'>
                <div style={{fontSize: '4vh', marginTop: '2vh', marginBottom: '2vh', fontWeight: 'bold'}}>?????????? ???????????? ??????</div>
                    <TextField style={{width: '80%'}}   label='?????? ??????(?????????? ??????????)' onChange={handleDonor}/>
                {donorErrorMsg}<br/>
                <TextField style={{width: '80%'}}  label='???? ???????????? ?????????????????? (??????????????????)' onChange={handleInstaName}/><br/>
                    <TextField style={{width: '80%'}} multiline variant='filled' rows='10' type='rtl' label='??????????' onChange={handleDescription}/>
                {descriptionErrorMsg}<br/>
                <input accept="image/*" style={{ display: 'none' }} id="raised-button-file" multiple type="file" onChange={handlePhotos}/>
                    <label htmlFor="raised-button-file">
                        <Button style={{fontSize: '1.7rem'}} variant="contained" color='primary' component="span">
                        ?????????? ????????????
                        </Button>
                    </label>
                {photosErrorMsgBigger}{photosErrorMsgNone}<br/>
                <ReCAPTCHA  sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={() => setRecaptcha(true)} onExpired={() => setRecaptcha(false)}/>
                {recaptchaErrorMsg}<br/>
                <div className='buttons-container'>
                    <button className='add-buttons' type='submit' >?????????? ????????</button>
                    <button className='add-buttons' type='reset' onClick={handleExit}>??????????</button>
                </div>
                {fieldsError}
                <Dialog open={progressScreen}>
                    <DialogContent>
                        {requestMsg}
                    </DialogContent>
                </Dialog>

            </form>

        </Dialog>
    )
}

export default withStyles(styles)(AddStoryForm);