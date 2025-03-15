import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const SchoolAssign = () => {
    const navigate = useNavigate();

    // Validation schema
    const validationSchema = yup.object({
        class_id: yup.number().typeError("Class must be a number").required("Class is required"),
        teacher_id: yup.number().typeError("Teacher is required"),
    });

    const formik = useFormik({
        initialValues: {
            class_id: "",
            teacher_id: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const token = localStorage.getItem("token");

            if (!token) {
                Swal.fire({
                    title: "Authentication Error",
                    text: "Please log in to continue.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
                navigate("/login");
                return;
            }

            try {
                const response = await axios.post(
                    "https://attendipen-d65abecaffe3.herokuapp.com/classes/assign_teacher",
                    values,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 201) {
                    Swal.fire({
                        title: "Teacher assigned successfully!",
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => navigate("/classes")); // Redirect to class list
                }
            } catch (error) {
                let errorMessage = "An error occurred. Please try again.";

                if (error.response) {
                    errorMessage = error.response.data?.message || errorMessage;

                    if (error.response.status === 401) {
                        errorMessage = "Your session has expired. Please log in again.";
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                }

                Swal.fire({
                    title: "Error",
                    text: errorMessage,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        },
    });

    return (
        <div>
            <div className="form-container">
                <h2>Assign Teacher</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="number"
                        name="class_id"
                        placeholder="Class ID"
                        value={formik.values.class_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.class_id && formik.errors.class_id && (
                        <p className="error">{formik.errors.class_id}</p>
                    )}
                    <input
                        type="number"
                        name="teacher_id"
                        placeholder="Teacher ID"
                        value={formik.values.teacher_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.teacher_id && formik.errors.teacher_id && (
                        <p className="error">{formik.errors.teacher_id}</p>
                    )}
                    <button type="submit">Assign Teacher</button>
                </form>
            </div>
        </div>
    );
};

export default SchoolAssign;
