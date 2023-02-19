import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image'
const About = (props) => {
  return (
    <div>
      <Image src={props.image} alt="test" width={500} height={500}/>
    </div>
  );
};

export default About;
