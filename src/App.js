import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography, MenuItem } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string("이메일을 입력하세요.")
    .email("이메일 형식이 올바르지 않습니다.")
    .required("이메일을 압력해주세요"),
  pw: yup
    .string("비밀번호를 입력하세요.")
    .min("6", "최소 6자리 이상 12자리의 비밀번호를 입력하세요.")
    .max("12", "최소 6자리 이상 12자리의 비밀번호를 입력하세요.")
    .required("비밀번호를 입력해주세요."),
  pw_chk: yup
    .string("비밀번호를 입력하세요.")
    .required("비밀번호를 입력해주세요."),
  phone: yup
    .string()
    .matches(
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
      "핸드폰 번호를 입력해주세요."
    )
    .required("핸드폰 번호를 입력해주세요."),
  gender: yup.string().required("성별을 선택해주세요."),
});

function App() {
  const formik = useFormik({
    initialValues: {
      email: "",
      pw: "",
      pw_chk: "",
      phone: "",
      gender: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.phone.includes("-"))
        values.phone = values.phone.split("-").join("");
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit} className="form-wrap">
        <Typography variant="h4" sx={{ mb: 1 }}>
          회원가입
        </Typography>
        <TextField
          name="email"
          label="이메일"
          size="small"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          name="pw"
          label="비밀번호"
          type="password"
          size="small"
          fullWidth
          value={formik.values.pw}
          onChange={formik.handleChange}
          error={formik.touched.pw && Boolean(formik.errors.pw)}
          helperText={formik.touched.pw && formik.errors.pw}
        />
        <TextField
          name="pw_chk"
          label="비밀번호 확인"
          type="password"
          size="small"
          fullWidth
          value={formik.values.pw_chk}
          onChange={formik.handleChange}
          error={formik.touched.pw_chk && Boolean(formik.errors.pw_chk)}
          helperText={formik.touched.pw_chk && formik.errors.pw_chk}
        />

        <TextField
          name="phone"
          label="핸드폰 번호"
          size="small"
          fullWidth
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <TextField
          select
          fullWidth
          id="demo-simple-select"
          name="gender"
          value={formik.values.gender}
          label="성별"
          size="small"
          onChange={formik.handleChange}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
        >
          <MenuItem value={"male"}>남자</MenuItem>
          <MenuItem value={"female"}>여자</MenuItem>
        </TextField>

        <Button variant="contained" type="submit">
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default App;
