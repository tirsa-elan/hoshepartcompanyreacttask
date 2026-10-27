import {
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Switch
} from '@mui/material';

import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateTaskdetailbyId } from '../../share/http-services/task-list';

export default function EditTaskForm(props) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            completed: false
        }
    });

    useEffect(() => {
        reset({
            title: props.data?.title ?? '',
            description: props.data?.description ?? '',
            completed: props.data?.completed ?? false
        });
    }, [props.data, reset]);


    
        function onSubmit(data) {
           updateTaskdetailbyId(props.data.id, data).then((res) =>{

           })
        }
    

    return (
        <div className="form-container">
            <form className="row" onSubmit={handleSubmit(onSubmit)}>

                <div className="col-lg-6">
                    <TextField
                        fullWidth
                        label="عنوان تسک"
                        {...register('title', {
                            required: 'وارد کردن عنوان الزامی است'
                        })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </div>

                <div className="col-lg-6">
                    <TextField
                        fullWidth
                        label="توضیحات"
                        {...register('description', {
                            required: 'وارد کردن توضیحات الزامی است'
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
                                    label={field.value ? 'فعال' : 'غیرفعال'}
                                    control={
                                        <Switch
                                            checked={!!field.value}
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
                        {isSubmitting ? 'در حال ویرایش...' : 'ویرایش تسک'}
                    </Button>
                </div>

            </form>
        </div>
    );
}