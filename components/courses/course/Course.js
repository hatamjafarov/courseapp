import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./Course.module.css";
import ReactPlayer from "react-player";
import Context from "../../../store/context";

const Course = () => {
    const [videos, setVideos] = useState();
    const router = useRouter();
    const ctx = useContext(Context);

    const COURSES_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/courses/";

    var videoList = "";

    const titleRef = useRef();
    const urlRef = useRef();

    const path = router.query.name;
    useEffect(() => {
        const getVideos = async () => {
            const videoFetch = await fetch(`${COURSES_URL}${path}/videos.json`);
            videoList = await videoFetch.json();
            if (videoList) {
                setVideos(videoList);
            }
        };
        getVideos();
    }, [router.query.name]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const videoData = {
            name: ctx.username,
            title: titleRef.current.value,
            url: urlRef.current.value,
        };

        const checkValidation = (url) => {
            let validity = new RegExp(
                "^(https?:\\/\\/)?" + // protocol
                    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
                    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
                    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
                    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
                    "(\\#[-a-z\\d_]*)?$",
                "i"
            );
            return !!validity.test(url);
        };

        if (
            checkValidation(urlRef.current.value) &&
            ReactPlayer.canPlay(urlRef.current.value)
        ) {
            await fetch(`${COURSES_URL}${path}/videos.json`, {
                method: "POST",
                body: JSON.stringify({
                    videoData,
                }),
            }).then((response) => {
                if (response.status === 200) {
                    router.push("/courses");
                } else {
                    alert("something went wrong");
                }
            });
        } else {
            alert("url doesnt containt video");
        }
    };

    return (
        <div className={classes.desc}>
            {ctx.userActivity === "teacher" ? (
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Title</label>
                        <input type="text" ref={titleRef} />
                    </div>
                    <div>
                        <label>URL</label>
                        <input type="text" ref={urlRef} />
                    </div>
                    <div>
                        <button>Share</button>
                    </div>
                </form>
            ) : null}

            {videos ? (
                <div>
                    {Object.keys(videos).map((video) => (
                        <div className={classes.video_list} key={video}>
                            <h4>name: {videos[video].videoData.name}</h4>
                            <h4>title: {videos[video].videoData.title}</h4>
                            <ReactPlayer url={videos[video].videoData.url} />
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Course;
