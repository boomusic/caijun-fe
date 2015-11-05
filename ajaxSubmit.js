/**
 * @file ${FILE_NAME}. Created by PhpStorm.
 * @desc ${FILE_NAME}.
 *
 * @author yangjunbao
 * @since 15/11/4 下午5:15
 * @version 1.0.0
 */
(function () {
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
            BLOB: '__blob__',
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

    /**
     *
     * @param {*} settings
     * @param {string} [action]
     * @param {string} [method]
     * @param {string} [enctype]
     */
    function ajaxSubmit(settings, action, method, enctype) {
        var s,
            form,
            name,
            data,
            value;
        if (typeof settings === 'string') {
            settings = {formId: settings};
            if (action) settings.action = action;
            if (method) settings.method = method;
            if (enctype) settings.enctype = enctype;
        }
        s = extend({
            form: '',
            action: '',
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

        form = isElement(s.form) ? s.form : document.getElementById(s.form);
        name = form.name;
        if (!form)
            throw new Error('cannot find element by id');
        if (!isElement(form))
            throw new Error('element must be a form or element with name attr');
    }
});