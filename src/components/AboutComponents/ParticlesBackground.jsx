import React, {useCallback} from 'react';
import Particles from 'react-tsparticles';
import {loadSlim} from 'tsparticles-slim';

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fullScreen: {enable: true, zIndex: -1},
                background: {color: {value: 'transparent'}},
                fpsLimit: 60,
                particles: {
                    number: {value: 200},
                    color: {value: '#00ffff'},
                    opacity: {value: 0.1},
                    size: {value: 5},
                    move: {
                        enable: true,
                        speed: 0.2,
                        direction: 'none',
                        random: false,
                        straight: true,
                        outModes: {default: 'in'},
                    },
                    links: {
                        enable: true,
                        color: '#00ffff',
                        distance: 100,
                        opacity: 0.1,
                        width: 1.5,
                    },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "grab",
                            parallax: {
                                enable: true,
                                force: 80,
                                smooth: 5,
                            },
                        },
                        onClick: {
                            enable: true,
                            mode: 'grab',
                            parallax: {
                                enable: true,
                                force: 80,
                                smooth: 5,
                            },
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            links: {opacity: 0.6},
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default ParticlesBackground;
