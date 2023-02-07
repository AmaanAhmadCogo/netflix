import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { Link } from "react-router-dom";

import { FaSistrix } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiTwotoneLike } from "react-icons/ai";


// the minimum length of the searched movie should be 3
const Home = () => {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("avengers");

    const [likedMovies, setLikedMovies] = useState([]);

    const getMovies = async () => {
        // console.log(search);
        if (search.length > 2) {
            const moviesRequest = await axios.get(
                `http://www.omdbapi.com/?s=${search}&apikey=5fbf347`
            );
            setMovies(moviesRequest.data.Search);
        } else {
            alert("minimum length of the movie title = 3")
        }
        // console.log(movies);
    }
    
    useEffect(() => {
        getMovies();
    }, [])

    useEffect(() => {
        let arr = localStorage.getItem("likedMovies");

        if (arr) {
            setLikedMovies(JSON.parse(arr));
        } else {
            setLikedMovies([]);
        }
    }, [])
    return (
        <div>

            <div style={{
                display: "flex", flexDirection: "row", height: "60px", justifyContent: "space-between", alignItems: "center", position: "fixed", width: "100%",
                // backgroundColor: "rgb(29, 23, 23)",
                background: "rgb(29,23,23)",
                background: "linear-gradient(90deg, rgba(29,23,23,0.96) 0%, rgba(26,60,65,1) 41%, rgba(29,23,23,0.96) 59%, rgba(0,0,0,1) 100%, rgba(0,36,255,1) 100%, rgba(13,108,163,1) 100%, rgba(0,114,144,1) 100%)",
                top: "0px", padding: "20px"
            }}>
                <div style={{ padding: "0 0 0 20px" }}><p style={{ fontWeight: "bold", fontSize: "40px", fontFamily: 'Noto Sans JP', color: "aqua", textShadow: "1px 1px 16px rgba(32, 181, 255, 1)" }}>ネットフリックス</p></div>
                <div style={{ display: "flex", padding: "0 50px 0 0", justifyContent: "center", alignItems: "center" }}>
                    <input type="text" value={search}
                        placeholder="Search here..."
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            borderRadius: "20px",
                            width: "200px",
                            height: "25px",
                            padding: "3px 3px 3px 15px",
                            fontSize: "13px",
                            fontFamily: 'Noto Sans JP',
                            color: "#666699"
                        }}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <FaSistrix size={25} style={{ color: "white" }} onClick={getMovies} />
                </div>
            </div>

            {/* All Movies */}
            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly", paddingTop: "100px" }}>
                {movies.length > 0 ? movies.map((movie) => {
                    return (
                        <Link to={movie.imdbID}>
                            <div style={styles.card}>
                                <div>
                                    <img src={movie.Poster} />
                                </div>

                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '100%', padding: "0px 30px" }}>
                                    <div><p style={{ color: "white", fontFamily: 'Noto Sans JP', fontSize: "12px" }}>{movie.Title}</p></div>
                                    <div><AiTwotoneLike
                                        style={{ color: "white" }}
                                        onClick={() => {
                                            setLikedMovies([...likedMovies, movie])
                                            localStorage.setItem("likedMovies", JSON.stringify([...likedMovies, movie]))
                                        }}
                                    />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }) : 'nothing to display'}
            </div>

            {/* Liked Movies */}
            <div>
                {likedMovies.length > 0 ?
                    <div>
                        <div><p style={{ color: "white", fontFamily: 'Noto Sans JP', fontSize: "30px"}}>Liked Movies</p></div>
                        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "space-evenly", paddingTop: "10px" }}>
                            {likedMovies.map((movie) => {
                                return (
                                    <div style={styles.card}>
                                        <div>
                                            <img src={movie.Poster} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '100%', padding: "0px 30px" }}>
                                            <div><p style={{ color: "white", fontFamily: 'Noto Sans JP', fontSize: "12px" }}>{movie.Title}</p></div>

                                            <div><FcLike
                                                style={{ fill: "white" }}
                                                onClick={(e) => {
                                                    setLikedMovies(likedMovies.filter((id) => id.imdbID !== movie.imdbID));
                                                    localStorage.setItem("likedMovies", JSON.stringify(likedMovies.filter((id) => id.imdbID !== movie.imdbID)));
                                                }} /></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : ""}
            </div>
        </div >
    )

}

export default Home;

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
        marginBottom: "30px",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
        boxShadow: "0px 1px 5px 5px rgb(62, 61, 61)"
    }
}