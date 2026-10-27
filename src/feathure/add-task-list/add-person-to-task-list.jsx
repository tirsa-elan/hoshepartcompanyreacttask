import {
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Switch
} from '@mui/material';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import './add-user-list.css';
import { useNavigate } from 'react-router-dom';
import { addTasks } from '../../share/http-services/task-list';

export default function AddTaskForm() {
     const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            completed: false
        }
    });

    function onSubmit(data) {
        addTasks(data).then((res) =>{
            navigate('/home/tasklist');
        })
        console.log("خروجی فرم:", data);
    }

    return (
        <div className="form-container">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>

                <div className="col-lg-6">
                    <TextField
                        fullWidth
                        label="عنوان تسک"
                        {...register("title", {
                            required: "وارد کردن عنوان الزامی است"
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </div>

                <div className="col-lg-6">
                    <TextField
                        fullWidth
                        label="توضیحات"
                        {...register("description", {
                            required: "وارد کردن توضیحات الزامی است"
                        })}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                    />
                </div>

                <div className="col-lg-6">
                    <FormControl fullWidth>
                        <Controller
                            name="completed"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    label={field.value ? "فعال" : "غیرفعال"}
                                    control={
                                        <Switch
                                            checked={field.value}
                                            onChange={(e) =>
                                                field.onChange(e.target.checked)
                                            }
                                            color="success"
                                        />
                                    }
                                />
                            )}
                        />
                    </FormControl>
                </div>

                <div className="col-lg-12">
                    <Button
                        type="submit"
                        variant="contained"
                        className="btn-style"
                        size="small"
                        sx={{ mt: 2 }}
                    >
                        افزودن تسک
                    </Button>
                </div>

            </form>
        </div>
    );
}