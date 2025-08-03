import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { CREATE_REVIEW } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-native";

const validation = yup.object().shape({
  ownerName: yup
    .string()
    .min(1, "Owner name is required")
    .required("Owner name is required"),
  repositoryName: yup
    .string()
    .min(1, "Repository name is required")
    .required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  review: yup
    .string()
    .min(10, "Review must be at least 10 characters")
    .required("Review is required"),
});

const initial = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  review: "",
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    padding: "4%",
    gap: 16,
  },
  input: {
    width: "100%",
    height: "8%",
    borderWidth: 1,
    paddingLeft: "3%",
    borderRadius: 4,
    fontSize: 20,
  },
  btn: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: "100%",
    height: "8%",
  },
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initial,
    onSubmit: async (values) => {
      try {
        const { data } = await createReview({
          variables: {
            repositoryName: values.repositoryName,
            ownerName: values.ownerName,
            rating: parseInt(values.rating),
            text: values.review,
          },
        });
        console.log("data", data);
        const idOfRepo = data.createReview.repository.id;
        if (!idOfRepo) {
          setSubmitError(true);
          return;
        }
        navigate(`/repos/${idOfRepo}`);
        setSubmitError(false);
      } catch (e) {
        console.log(e);
        setSubmitError(true);
      }
    },
    validationSchema: validation,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.ownerName ? "red" : "grey" },
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        testID="ownerName"
        onChangeText={formik.handleChange("ownerName")}
        autoCapitalize="none"
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: "red" }}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.repositoryName ? "red" : "grey" },
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        testID="repositoryName"
        onChangeText={formik.handleChange("repositoryName")}
        autoCapitalize="none"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: "red" }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.rating ? "red" : "grey" },
        ]}
        placeholder="Rating (0-100)"
        value={formik.values.rating}
        testID="rating"
        onChangeText={formik.handleChange("rating")}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: "red" }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          { borderColor: formik.errors.review ? "red" : "grey" },
          { height: "20%", textAlignVertical: "top" },
        ]}
        placeholder="Review"
        value={formik.values.review}
        testID="review"
        onChangeText={formik.handleChange("review")}
        multiline
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: "red" }}>{formik.errors.review}</Text>
      )}

      <Pressable
        style={styles.btn}
        onPress={formik.handleSubmit}
        testID="submitButton"
      >
        <Text
          style={{ color: "white" }}
          fontSize="subheading"
          fontWeight="bold"
        >
          Create a review
        </Text>
      </Pressable>
      {submitError && (
        <Text style={{ color: "red" }}>
          Error creating review. Please try again.
        </Text>
      )}
    </View>
  );
};

export default ReviewForm;
