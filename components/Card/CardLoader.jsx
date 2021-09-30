import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = ({style}) => {
    return (
    <ContentLoader 
      speed={2}
      backgroundColor="rgb(77, 51, 50)"
      foregroundColor="#ecebeb"
      style={{width: "100%", height: "100%", borderRadius: "10px", ...style}}
    >
      <rect x="0" y="0" rx="10" ry="10" width="700" height="500" /> 
    </ContentLoader>
)}

  export default CardLoader