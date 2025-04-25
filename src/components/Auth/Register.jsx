import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../auth';
import {Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';

const Register = () => {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleChange = (e) => {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/register/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const success = await login(formData);
                if (success) navigate('/');
            } else {
                const data = await res.json();
                setError(data.detail || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    return (
        <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center px-4">
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={6} lg={4}>
                    <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                        <h2 className="text-center text-primary mb-4">Register</h2>

                        {error && (
                            <Alert variant="danger" className="text-center">
                                {error}
                            </Alert>
                        )}

                        <Form.Group controlId="registerEmail" className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="registerPassword" className="mb-4">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Register
                        </Button>

                        <Button
                            as="a"
                            href={`${import.meta.env.VITE_API_URL}/accounts/google/login/`}
                            variant="danger"
                            className="w-100 mt-3"
                        >
                            Continue with Google
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
