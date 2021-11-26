import { useState, useEffect } from 'react';

const useForm = (validate) => {
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	return { errors, setErrors, setIsSubmitting };
};

export default useForm;
