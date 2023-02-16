import React from "react";
import SimpleBlockContent from "../SimpleBlockContent";
import { TypedObject } from "@portabletext/types";
import styled from "@emotion/styled";
import imageUrlBuilder from "@sanity/image-url";
import client from "../../client";
import Image from "next/image";
import { Property } from "csstype";

interface TextWithImageSectionProps {
  heading: string;
  text: TypedObject[];
  label?: string;
  picture?: { asset: { _ref: string }; _type: string };
}

const StyledWraperDiv = styled("div")({
  "@media (max-width: 1200px)": {
    padding: "0 10px"
  },
  display: "flex",
  position: "relative",
  section: { backgroundColor: "rgba(var(--background-color-rgb), 0.8)" },
  span: {
    zIndex: -9999,
    position: "absolute",
    display: "grid !important",
    alignItems: "center",
    justifyContent: "start",
    img: {
      position: "unset!important" as Property.Position,
      left: "0  !important",
      bottom: "unset !important",
      right: "unset !important",
      width: "auto !important",
      height: "100% !important",
      maxHeight: "120vw !important",
      maxWidth: "120vw !important",
      minWidth: "auto  !important",
      minHeight: "auto  !important"
    }
  }
});

const StyledSection = styled("section")({
  marginTop: 0,
  marginBottom: 0,
  paddingTop: "2em",
  paddingBottom: "2em"
});

const builder = imageUrlBuilder(client);

function TextWithImageSection(props: TextWithImageSectionProps) {
  const { heading, text, picture, label } = props;
  const img = picture
    ? builder.image(picture.asset._ref).auto("format").url()
    : null;
  if (!img) {
    return (
      <StyledWraperDiv>
        <StyledSection>
          {heading?.length && <h2>{heading}</h2>}
          {text && <SimpleBlockContent blocks={text} />}
        </StyledSection>
      </StyledWraperDiv>
    );
  }
  return (
    <StyledWraperDiv>
      <Image
        alt={label}
        src={img}
        objectFit={"cover"}
        layout="fill"
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
      ></Image>
      <StyledSection>
        {heading?.length && <h2>{heading}</h2>}
        {text && <SimpleBlockContent blocks={text} />}
      </StyledSection>
    </StyledWraperDiv>
  );
}

export default TextWithImageSection;
