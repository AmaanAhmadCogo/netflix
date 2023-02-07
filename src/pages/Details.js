import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { BsFillBackspaceFill } from "react-icons/bs"


// the minimum length of the searched movie should be 3
const Details = () => {

    const id = useParams();
    const [search, setSearch] = useState("");
    const [movieID, setMovieID] = useState("");

    const getMovieDetails = async () => {
        const moviesRequestID = await axios.get(`http://www.omdbapi.com/?i=${id.id}&apikey=5fbf347`);
        console.log(moviesRequestID.data)
        setMovieID(moviesRequestID.data);
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return (
        <div>
            {/* header */}
            <div style={{
                display: "flex", flexDirection: "row", height: "60px", justifyContent: "space-between", alignItems: "center", position: "fixed", width: "100%",
                background: "rgb(29,23,23)",
                background: "linear-gradient(90deg, rgba(29,23,23,0.96) 0%, rgba(26,60,65,1) 41%, rgba(29,23,23,0.96) 59%, rgba(0,0,0,1) 100%, rgba(0,36,255,1) 100%, rgba(13,108,163,1) 100%, rgba(0,114,144,1) 100%)",
                top: "0px", padding: "20px"
            }}>
                    <div style={{ padding: "0 0 0 20px" }}><p style={{ fontWeight: "bold", fontSize: "40px", fontFamily: 'Noto Sans JP', color: "aqua", textShadow: "1px 1px 16px rgba(32, 181, 255, 1)" }}>ネットフリックス</p></div>
                    <div style={{ display: "flex", padding: "0 50px 0 0", justifyContent: "center", alignItems: "center" }}>
                        <BsFillBackspaceFill size={25} style={{ fill: "white" }} />
                    </div>
            </div>
            {
                movieID ?
                    <>
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", paddingTop: "120px", paddingLeft:"50px" ,color: "white", fontFamily: "Noto Sans"}}>
                            <div style={styles.card}><img src={movieID.Poster} style={{ width: "300px", height: "auto" }} /></div>
                            <div style={{ width: "300px", height: "auto", padding: " 0 0 0 50px", fontFamily: "Noto Sans" }}>
                                <h1 style={{fontSixe:"140px", textShadow: "1px 1px 16px rgba(32, 181, 255, 1)"}}>
                                    {movieID.Title}
                                </h1>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", height: "300px", width: "600px", fontSize: "24px" }}>
                                    <div>
                                        Genre : &nbsp;{movieID.Genre}
                                    </div>
                                    <div>
                                        Release Date: &nbsp;{movieID.DVD}
                                    </div>
                                    <div>
                                        Director : &nbsp;{movieID.Director}
                                    </div>
                                    <div>
                                        Actors : &nbsp;{movieID.Actors}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "85%", height: "auto", padding: " 0 0 0 50px", fontFamily: "Noto Sans", color: "white", fontSize: "30px" }}>
                            <h3>Plot:</h3>
                            <p>{movieID.Plot}</p>
                        </div>
                    </>
                    : console.log("not working", movieID.id)
            }

        </div >
    )

}

export default Details;

const styles = {
    header: {
        display: "flex",
        flexDirection: "row",
        height: "60px",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        flex: 1
    },
    card: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        // marginBottom: "30px",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
        boxShadow: "0px 1px 5px 5px rgb(62, 61, 61)"
    }
}
