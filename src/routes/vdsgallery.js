import { useState, useEffect } from 'react';

import { getUrl } from 'aws-amplify/storage';
// import { AmplifyS3Image, AmplifyS3Album, AmplifyS3ImagePicker } from "@aws-amplify/ui-react/legacy";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const ImagePath = 'assets/photos/'
// function srcset(image, size, rows = 1, cols = 1) {
//     let tmp = {
//         src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//         // srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
//     };
//     return tmp;
// }

//     // image name should be relative to the public folder
//     // example: public/images/test.png => Storage.get('images/test.png' ...
const VDSImage = ({ imageSpec }) => {

    const [imageRef, setImageRef] = useState("");

    useEffect(() => {

        const imageUrl = async (imageName) => {
            const picUrl = await getUrl({
                key: (ImagePath + imageName),
                options: {
                    accessLevel: 'guest', // can be 'private', 'protected', or 'guest' but defaults to `guest`
                    expiresIn: 20 // validity of the URL, in seconds. defaults to 900 (15 minutes) and maxes at 3600 (1 hour)
                },
            })
            setImageRef({ result: picUrl.url });
        };
        imageUrl(imageSpec.img);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return ((imageRef === undefined) ?
        <p>LOADING...</p>
        :

        <Box
            component="img"
            sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
            }}
            src={imageRef.result}
            alt={imageSpec.title}
            loading="lazy"
        />
    )
}


export default function VDSGallery() {

    return (
        <div>
            {/* <AmplifyS3Album path={ImagePath} />
            <AmplifyS3Image imgKey={ImagePath + item.img} /> */}
            {/* <AmplifyS3Image style={srcset(ImagePath + item.img, 121, item.rows, item.cols)} imgKey={ImagePath + item.img} />  */}

            <ImageList
                sx={{ width: '100%', height: '100%' }}
                variant="quilted"
                cols={4}
                rowHeight={121}
            >

                {itemData.map((item) => (
                    <Tooltip title={item.title} key={item.img}>
                        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <VDSImage imageSpec={item} />
                        </ImageListItem>
                    </Tooltip>
                ))}
            </ImageList>
        </div>
    )
}


const itemData = [
        {
        img: 'vds0.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
]
    const itemData2 = [
        {
        img: 'signbanner.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'vds6.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'vds2.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'vds4.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'vds5.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'vds7.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'vds8.jpg',
        title: 'Vista Del Surf',
        rows: 2,
        cols: 2,
    },
    {
        img: 'steps0.jpg',
        title: 'STEPS',
        rows: 2,
        cols: 2,
    },
    {
        img: 'steps1.jpg',
        title: 'STEPS',
    },
    {
        img: 'steps2.jpg',
        title: 'STEPS',
    },
    {
        img: 'steps3.jpg',
        title: 'STEPS',
    },
    {
        img: 'steps4.jpg',
        title: 'STEPS',
    },
    {
        img: 'sandy4.jpg',
        title: 'SANDY',
        rows: 2,
        cols: 2,
    },
    {
        img: 'sandy1.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy2.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy5.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy6.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy3.jpg',
        title: 'SANDY',
        rows: 2,
        cols: 2,
    },
    {
        img: 'sandy7.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy8.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy9.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy10.jpg',
        title: 'SANDY',
    },
    {
        img: 'sandy0.jpg',
        title: 'SANDY',
        rows: 2,
        cols: 2,
    },
    {
        img: 'sandy11.jpg',
        title: 'SANDY',
        rows: 2,
        cols: 1,
    },
    {
        img: 'sandy12.jpg',
        title: 'SANDY',
        rows: 2,
        cols: 1,
    },
    {
        img: 'trespalmas7.jpg',
        title: 'TRES PALMAS',
        rows: 2,
        cols: 2,
    },
    {
        img: 'trespalmas2.jpg',
        title: 'TRES PALMAS',
        cols: 2,
    },
    {
        img: 'trespalmas3.jpg',
        title: 'TRES PALMAS',
        cols: 2,
    },
    {
        img: 'trespalmas4.jpg',
        title: 'TRES PALMAS',
        rows: 2,
        cols: 2,
    },
    {
        img: 'trespalmas5.jpg',
        title: 'TRES PALMAS',
    },
    {
        img: 'trespalmas6.jpg',
        title: 'TRES PALMAS',
    },
    {
        img: 'trespalmas8.jpg',
        title: 'TRES PALMAS',
    },
    {
        img: 'trespalmas9.jpg',
        title: 'TRES PALMAS',
    },
    {
        img: 'trespalmas1.jpg',
        title: 'TRES PALMAS',
        rows: 2,
        cols: 4,
    },

];
