import React from "react";
import {
  Box,
  Button,
  Image as ChakraImage,
  Input,
  Stack,
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Divider,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Landing = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [data, setData] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          setDimensions({ width: img.width, height: img.height });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("image", image);
    const uuid = uuidv4();
    formData.append("uuid", uuid);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/stripColors/processImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Upload successful:", setData(response.data));
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(dimensions);
  }, [dimensions]);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "75vw",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Card maxW="sm">
          <CardBody>
            <Stack mt="6" spacing="3">
              {preview != null &&
              dimensions.height != 0 &&
              dimensions.width != 0 ? (
                <Box>
                  <Heading size="md" p={"7px 0px"}>
                    Sample Image
                  </Heading>
                  <Divider />
                  <ChakraImage
                    src={preview}
                    alt="Preview"
                    height={`${dimensions.height / 3}`}
                    width={`${dimensions.width / 3}`}
                    p={"7px 0"}
                  />
                </Box>
              ) : (
                <Box>
                  <Heading size="md">Upload Image to see preview</Heading>
                </Box>
              )}
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={"10px"}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            />
            {preview != null &&
            dimensions.height != 0 &&
            dimensions.width != 0 ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : null}
          </CardFooter>
        </Card>
        {preview != null && dimensions.height != 0 && dimensions.width != 0 ? (
          <Box w={"sm"} height={"sm"}>
            <Heading>Output: </Heading>
            {data != null ? (
              <Box
                display={"flex"}
                alignItems={"align-left"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Text>&#123;</Text>
                <Text p='2px 15px'>"URO": {JSON.stringify(data['URO'])}</Text>
                <Text p='2px 15px'>"BIL": {JSON.stringify(data['BIL'])}</Text>
                <Text p='2px 15px'>"KET": {JSON.stringify(data['KET'])}</Text>
                <Text p='2px 15px'>"BLD": {JSON.stringify(data['BLD'])}</Text>
                <Text p='2px 15px'>"PRO": {JSON.stringify(data['PRO'])}</Text>
                <Text p='2px 15px'>"NIT": {JSON.stringify(data['NIT'])}</Text>
                <Text p='2px 15px'>"LEU": {JSON.stringify(data['LEU'])}</Text>
                <Text p='2px 15px'>"GLU": {JSON.stringify(data['GLU'])}</Text>
                <Text p='2px 15px'>"SG": {JSON.stringify(data['SG'])}</Text>
                <Text p='2px 15px'>"PH": {JSON.stringify(data['PH'])}</Text>
                <Text>&#125;</Text>

              </Box>
            ) : (
              <Text p="15px 0">Submit to analyze the Image</Text>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Landing;
