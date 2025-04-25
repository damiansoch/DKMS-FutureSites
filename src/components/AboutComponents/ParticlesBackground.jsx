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
                    number: {value: 60},
                    color: {value: '#00ffff'},
                    opacity: {value: 0.4},
                    size: {value: 4},
                    move: {
                        enable: true,
                        speed: 0.2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        outModes: {default: 'out'},
                    },
                    links: {
                        enable: true,
                        color: '#00ffff',
                        distance: 130,
                        opacity: 0.2,
                        width: 1.5,
                    },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: 'grab',
                            parallax: {
                                enable: true,
                                force: 60,
                                smooth: 10,
                            },
                        },
                        onClick: {
                            enable: true,
                            mode: 'grab',
                            parallax: {
                                enable: true,
                                force: 60,
                                smooth: 10,
                            },
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 150,
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
