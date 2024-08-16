import React,{useEffect,useState} from "react";
const Body=()=>{
const[meme,setMeme]=useState({
    toptext:"",
    bottomtext:"",
    image:"https://i.imgflip.com/1g8my4.jpg",
})
const[setterMeme,setSetterMeme]=useState([0])
function nextMeme(){    
    setMeme((predata)=>{
        return{
            ...predata,
            image:setterMeme,

        }
    })
}
    const getResponse= async()=>{
    try{
    const response= await fetch("https://api.imgflip.com/get_memes");
    if(!response.ok){
        console.log("error");
    }
    const json =await response.json();
    return json.data.memes;
}
    catch(error){
        console.log(error);
        return null;
    }
}
useEffect(()=>{
getResponse().then((info)=>{
    const random=Math.floor(Math.random()*100);
    setSetterMeme(info[random].url)
})
},[meme])
function change(event){
    setMeme((previnfo)=>{
        return{
            ...previnfo,
            [event.target.name]:event.target.value,
        }
    })
}
    return(
        <div>
            <input type="text" placeholder="Enter text at top of meme" name="toptext"  onChange={change}/>
            <input type="text" placeholder="Enter text at bottom of meme" name="bottomtext" onChange={change} />
            <button onClick={nextMeme}>Next meme</button>
            <div className="meme">
            <img src={meme.image} alt="" />
            <p className="top text"> {meme.toptext}</p>
            <p className="bottom text">{meme.bottomtext}</p>
            </div>
        </div>
    )
}
export default Body;