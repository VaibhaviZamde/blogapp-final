import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b';

    // ✅ FIXED useEffect
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);

                setPost(prev => ({
                    ...prev,
                    picture: response.data
                }));
            }
        };

        getImage();

        setPost(prev => ({
            ...prev,
            categories: location.search?.split('=')[1] || 'All',
            username: account?.username || ''
        }));

    }, [file, location.search, account]);

    // ✅ SAVE POST
    const savePost = async () => {
        console.log("POST DATA:", post);

        if (!post.title) {
            alert("Title is required");
            return;
        }

        try {
            await API.createPost(post);
            navigate('/');
        } catch (error) {
            console.log("POST ERROR:", error);
        }
    };

    // ✅ HANDLE INPUT CHANGE
    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {/* ✅ Controlled Input */}
                <InputTextField
                    value={post.title}
                    onChange={handleChange}
                    name="title"
                    placeholder="Title"
                />

                <Button
                    onClick={savePost}
                    variant="contained"
                    color="primary"
                >
                    Publish
                </Button>
            </StyledFormControl>

            {/* ✅ Controlled Textarea */}
            <Textarea
                minRows={5}
                value={post.description}
                placeholder="Tell your story..."
                name="description"
                onChange={handleChange}
            />
        </Container>
    );
};

export default CreatePost;