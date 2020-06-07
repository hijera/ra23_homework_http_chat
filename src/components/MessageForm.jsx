import React, {useState} from 'react';
import PropTypes from 'prop-types';

MessageForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function MessageForm(props) {
    const { onSubmit } = props;
    const [form,setForm] = useState({content:''});

    const onFormChange = evt => {
        const { target } = evt;
        setForm({...form,[target.name]:target.value});
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        if(!Object.values(form).some(item=>item.trim().length===0))
            onSubmit(form);
        setForm({content:''});
    };

    return (
        <div className={"submit-form"}>
            <form onSubmit={handleSubmit} >
                <input name={'content'} value={form.content} onChange={onFormChange} placeholder={ "Введите текст для отправки..."} />
                <button>►</button>
            </form>
        </div>
    );
}

export default MessageForm;