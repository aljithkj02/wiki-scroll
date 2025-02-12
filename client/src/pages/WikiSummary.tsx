import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { getRandomWiki } from "../api/wiki";
import { IWikkiSummary } from "../api/types/wikki-summary";

const WikiContainer = styled(Box)({
    height: "100vh",
    width: "100%",
    overflowY: "auto",
    scrollSnapType: "y mandatory",
    scrollBehavior: "smooth",
    scrollbarWidth: "none", // Hides scrollbar in Firefox
    "msOverflowStyle": "none", // Hides scrollbar in IE/Edge
    "&::-webkit-scrollbar": {
        display: "none", // Hides scrollbar in Chrome/Safari
    },
});

const WikiItem = styled(Box)(({ background }: { background: string }) => ({
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    //   background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background}) center/cover no-repeat`,
    background: `url(${background}) center/cover no-repeat`,
    color: "white",
    textAlign: "center",
    padding: "20px",
    scrollSnapAlign: "start",
    objectFit: 'cover'
}));

const ContentBox = styled(Box)({
    position: "absolute",
    bottom: "10%", // Keep content towards the bottom
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    textAlign: "center",
    color: "#fff",
    background: "rgba(0, 0, 0, 0.5)", // Slight dark background for contrast
    padding: "2rem",
    borderRadius: "10px",
    backdropFilter: "blur(10px)", // Adds a glass effect
});

const Title = styled(Typography)({
    fontSize: "2.5rem",
    fontWeight: "bold",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)", // Creates a glow effect
});

const Description = styled(Typography)({
    fontSize: "1.2rem",
    opacity: 0.9,
    marginTop: "1rem",
    lineHeight: "1.5",
});


export const WikiSummary = () => {
    const [wikiData, setWikiData] = useState<IWikkiSummary[]>([])
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        fetchWikiData();
    }, [])

    const lastPostElementRef = useCallback(
        (node: Element) => {
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchWikiData()
                }
            });

            if (node) observer.current.observe(node);
        },
        []
    );

    const fetchWikiData = async () => {
        const res = await getRandomWiki()
        if (res) {
            setWikiData(prev => [...prev, res.data]);
        }
    }

    return (
        <WikiContainer>
            {wikiData.map((item, index) => (
                <WikiItem key={index} background={item.thumbnail}
                    ref={wikiData.length === index + 1 ? lastPostElementRef : null}
                >
                    <ContentBox>
                        <Title>{item.title}</Title>
                        <Description>{item.description}</Description>
                        
                        <a href={item.contentLink} target="_blank" 
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                sx={{
                                    mt: 2, display: 'flex', alignItems: "center", justifyContent: 'center', cursor: 'pointer',
                                    transition: "font-weight 0.3s ease",
                                    color: "#F0F0F0", fontWeight: 600,
                                    "&:hover": {
                                        "& svg": { transform: "translateX(5px)" },
                                        color: "#FFF"
                                    }
                                }}
                            >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                    width="22px" height="18px"
                                    style={{ transition: "transform 0.3s ease" }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </Typography>
                        </a>
                    </ContentBox>
                </WikiItem>
            ))}
        </WikiContainer>
    );
};
