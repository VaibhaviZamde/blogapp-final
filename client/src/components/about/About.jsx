import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const OverlayText = styled(Typography)`
    color: white;
    font-size: 48px;
    font-weight: 600;
    background: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const Wrapper = styled(Box)`
    padding: 60px 120px;
    max-width: 900px;
    margin: auto;
`;

const Text = styled(Typography)`
    color: #555;
    line-height: 1.7;
    margin-top: 20px;
    font-size: 18px;
`;

const IconWrapper = styled(Box)`
    display: inline-flex;
    align-items: center;
    margin-left: 8px;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.2);
    }
`;

const About = () => {

    return (
        <Box>
            {/* Banner */}
            <Banner>
                <OverlayText>About Me</OverlayText>
            </Banner>

            {/* Content */}
            <Wrapper>
                <Typography variant="h3" fontWeight={600} gutterBottom>
                    Code for Interview
                </Typography>

                <Text>
                    I'm a Software Engineer based in India. I've built modern web applications,
                    desktop software, and scalable backend systems.
                </Text>

                <Text>
                    If you are interested, you can view some of my favorite projects here
                    <IconWrapper>
                        <Link href="https://github.com/kunaltyagi9" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </IconWrapper>
                </Text>

                <Text>
                    Need something built or just want to chat? Reach out to me on
                    <IconWrapper>
                        <Link href="https://www.instagram.com/codeforinterview/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </IconWrapper>
                    or send me an Email
                    <IconWrapper>
                        <Link
                            href="mailto:codeforinterview@gmail.com?Subject=Hello"
                            target="_blank"
                            color="inherit"
                        >
                            <Email />
                        </Link>
                    </IconWrapper>
                </Text>
            </Wrapper>
        </Box>
    );
};

export default About;