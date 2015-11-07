/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/11/6 上午10:41
 * @version 1.0.0
 */
(function (window) {
    var methods = {
            GET: 'GET',
            POST: 'POST',
            PUT: 'PUT',
            DELETE: 'DELETE',
            HEAD: 'HEAD',
            OPTIONS: 'OPTIONS',
            PATCH: 'PATCH'
        },
        enctypes = {
            BLOB: 'binary',
            FORM_DATA: 'multipart/form-data',
            URL_ENCODE: 'application/x-www-form-urlencoded'
        },
        i,
        j;

    function extend(obj, ext) {
        obj = obj || {};
        for (var i in ext) {
            if (ext.hasOwnProperty(i)) {
                obj[i] = ext[i];
            }
        }
        return obj;
    }

    function serializeArray(form) {
        var name, type, result = [],
            i, field,
            add = function (value) {
                if (value.forEach) return value.forEach(add);
                result.push({name: name, value: value})
            };
        for (i in form.elements) {
            if (form.elements.hasOwnProperty(i)) {
                field = form.elements[i];
                type = field.type;
                name = field.name;
                if (name && field.nodeName.toLowerCase() != 'fieldset'
                    && !field.disabled && type != 'submit' && type != 'reset'
                    && type != 'button' && type != 'file'
                    && ((type != 'radio' && type != 'checkbox') || field.checked))
                    add(field.value)
            }
        }
        return result
    }

    function serialize(form) {
        var result = [];
        serializeArray(form).forEach(function (elm) {
            result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
        });
        return result.join('&')
    }

    /**
     *
     * @param {*} settings
     * @param {string} [action]
     * @param {string} [method]
     * @param {string} [enctype]
     */
    function ajaxSubmit(settings, action, method, enctype) {
        var s,
            name,
            data = null,
            xhr,
            value;
        if (typeof settings === 'string') {
            settings = {formId: settings};
            if (action) settings.action = action;
            if (method) settings.method = method;
            if (enctype) settings.enctype = enctype;
        }
        s = extend({
            form: {},
            action: '',
            async: true,
            method: methods.GET,
            enctype: enctypes.FORM_DATA,
            timeout: 0,
            uploadAbort: null,
            uploadError: null,
            uploadLoadStart: null,
            uploadLoadEnd: null,
            uploadLoad: null,
            uploadProgress: null,
            uploadTimeout: null,
            responseProgress: null,
            success: null,
            error: null,
            complete: null
        }, settings);

        function isElement(dom) {
            return dom instanceof HTMLFormElement || dom.name;
        }

        name = s.form.name;
        if (!s.form)
            throw new Error('cannot find element by id');
        if (!isElement(s.form))
            throw new Error('element must be a form or element with name attr');
        if (!name && s.enctype === enctypes.BLOB)
            throw new Error('blob upload only support one value');
        // one element
        if (name) {
            if (s.form.type === 'file') {
                if (s.form.files.length === 0) {
                    throw new Error('file is empty');
                }
                value = s.form.files[0];
            } else {
                value = s.form.value;
            }
            if (s.enctype === enctypes.BLOB) {
                data = value;
            } else if (s.enctype = enctypes.URL_ENCODE) {
                data = name + '=' + value;
            } else {
                data = new FormData();
                data.append(name, value);
            }
        } else if (s.enctype === enctypes.URL_ENCODE) {
            // ignore file
            data = serialize(s.form);
        } else {
            data = new FormData(s.form);
        }
        xhr = new XMLHttpRequest();
        xhr.upload.onabort = s.uploadAbort;
        xhr.upload.onerror = s.uploadError;
        xhr.upload.onloadstart = s.uploadLoadStart;
        xhr.upload.onloadend = s.uploadLoadEnd;
        xhr.upload.onload = s.uploadLoad;
        xhr.upload.onprogress = s.uploadProgress;
        xhr.upload.ontimeout = s.uploadTimeout;
        xhr.onreadystatechange = function () {

        };
        xhr.onprogress = s.responseProgress;
        xhr.open(s.method, s.action, s.async);
        xhr.send(data);
        return xhr;
    }

    window.ajaxSubmit = ajaxSubmit;
    window.ajaxSubmit.enctypes = enctypes;
    window.ajaxSubmit.methods = methods;
})(window);