import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "../../../store/context";
import classes from "./News.module.css";

const News = () => {
    const ctx = useContext(Context);
    const [news, setNews] = useState();

    const router = useRouter();
    const subject = ctx.path;

    const titleRef = useRef();
    const infoRef = useRef();

    const COURSES_URL =
        "https://course-app-b602d-default-rtdb.firebaseio.com/courses/";

    useEffect(async () => {
        const eventsData = await fetch(`${COURSES_URL}${ctx.path}/news.json`);
        const events = await eventsData.json();
        if (events) {
            setNews(events);
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const newsData = {
            name: ctx.username,
            title: titleRef.current.value,
            info: infoRef.current.value,
        };

        fetch(
            `https://course-app-b602d-default-rtdb.firebaseio.com/courses/${subject}/news.json`,
            {
                method: "POST",
                body: JSON.stringify({ newsData }),
            }
        ).then((response) =>
            response.status === 200
                ? router.push(
                      `http://localhost:3000/courses/course?name=${subject}`
                  )
                : null
        );
    };

    return (
        <div>
            {ctx.isLoggedin ? (
                <div>
                    <form>
                        <input type="text" placeholder="title" ref={titleRef} />
                        <input type="text" placeholder="info" ref={infoRef} />
                        <button onClick={submitHandler}>Submit</button>
                    </form>
                </div>
            ) : (
                <h2>Login in please</h2>
            )}

            <div>news list</div>
            <div className={classes.newsFlex}>
                {news ? (
                    Object.keys(news).map((val) => (
                        <div key={val}>
                            <h5>{news[val].newsData.name}</h5>
                            <h3>{news[val].newsData.title}</h3>
                            <h3>{news[val].newsData.info}</h3>
                        </div>
                    ))
                ) : (
                    <h2>no comments available</h2>
                )}
            </div>
        </div>
    );
};

export default News;
