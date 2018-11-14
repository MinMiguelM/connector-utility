# Amazon SES
[![](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://www.bizagi.com/es/comunidad/global-xchange)

Amazon Simple Email Service (Amazon SES) is a cloud-based email sending service designed to help digital marketers and application developers send marketing, notification, and transactional emails.
***
## List of actions (20)
- [update-account-sending-enabled](#update-account-sending-enabled)
- [get-account-sending-enabled](#get-account-sending-enabled)
- [create-custom-verification-email-template](#create-custom-verification-email-template)
- [delete-custom-verification-email-template](#delete-custom-verification-email-template)
- [get-custom-verification-email-template](#get-custom-verification-email-template)
- [list-custom-verification-email-template](#list-custom-verification-email-template)
- [update-custom-verification-email-template](#update-custom-verification-email-template)
- [create-template](#create-template)
- [delete-template](#delete-template)
- [update-template](#update-template)
- [get-template](#get-template)
- [list-templates](#list-templates)
- [verify-domain-identity](#verify-domain-identity)
- [verify-email-identity](#verify-email-identity)
- [delete-identity](#delete-identity)
- [list-identities](#list-identities)
- [send-email](#send-email)
- [send-templated-email](#send-templated-email)
- [get-send-statistics](#get-send-statistics)
- [get-send-quota](#get-send-quota)
***
## update-account-sending-enabled
Enables or disables email sending across your entire Amazon SES account in the current AWS Region.
### INPUTS:
- enabled(boolean - requerido): indica que habilitar o deshabilitar el envío de correos en la región actual
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## get-account-sending-enabled
### INPUTS:
### OUTPUTS:
- Enabled(boolean): indica si está habilitado o deshabilitado el envío de correos
***
## create-custom-verification-email-template
### INPUTS:
- TemplateName(string - requerido): nombre que identificará el template a crear
- FromEmailAddress(string - requerido): la dirección de correo que enviará dicho email de verificación
- TemplateSubject(string - requerido): asunto que contendrá el correo de verificación
- SuccessRedirectionURL(string - requerido): En caso de que la verificación sea exitosa, el usuario será redireccionado a esta url
- FailureRedirectionURL(string - requerido): En caso de que la verificación no haya sido exitosa, el usuario será redireccionado a esta url
- TemplateContent(string - requerido): contenido del correo de verificación, este puede contener código HTML
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## delete-custom-verification-email-template
### INPUTS:
- TemplateName(string - requerido): nombre que con el que se creó el template
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## get-custom-verification-email-template
### INPUTS:
- TemplateName(string - requerido): nombre que con el que se creó el template
### OUTPUTS:
- TemplateName(string): nombre que identificará el template a crear
- FromEmailAddress(string): la dirección de correo que enviará dicho email de verificación
- TemplateSubject(string): asunto que contendrá el correo de verificación
- TemplateContent(string): contenido del correo de verificación, este puede contener código HTML
- SuccessRedirectionURL(string): En caso de que la verificación sea exitosa, el usuario será redireccionado a esta url
- FailureRedirectionURL(string): En caso de que la verificación no haya sido exitosa, el usuario será redireccionado a esta url
***
## list-custom-verification-email-template
### INPUTS:
### OUTPUTS:
- CustomVerificationEmailTemplates(lista de object): lista de templates que han sido creados
	- TemplateName(string): nombre que identificará el template a crear
	- FromEmailAddress(string): la dirección de correo que enviará dicho email de verificación
	- TemplateSubject(string): asunto que contendrá el correo de verificación
	- SuccessRedirectionURL(string): En caso de que la verificación sea exitosa, el usuario será redireccionado a esta url
	- FailureRedirectionURL(string): En caso de que la verificación no haya sido exitosa, el usuario será redireccionado a esta url
***
## update-custom-verification-email-template
### INPUTS:
- TemplateName(string - requerido): nombre que con el que se creó el template
- FromEmailAddress(string - opcional): la dirección de correo que enviará dicho email de verificación
- TemplateSubject(string - opcional): asunto que contendrá el correo de verificación
- SuccessRedirectionURL(string - opcional): En caso de que la verificación sea exitosa, el usuario será redireccionado a esta url
- FailureRedirectionURL(string - opcional): En caso de que la verificación no haya sido exitosa, el usuario será redireccionado a esta url
- TemplateContent(string - opcional): contenido del correo de verificación, este puede contener código HTML
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## create-template
### INPUTS:
- TemplateName(string - requerido): nombre que identifica al template
- HtmlPart(string - requerido): Contenido del template cuyo contenido puede o no tener sintaxis HTML
- SubjectPart(string - requerido): Asunto con el que el template se enviará
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## delete-template
### INPUTS:
- TemplateName(string - requerido): nombre que identifica al template
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## update-template
### INPUTS:
- TemplateName(string - requerido): nombre que identifica al template
- HtmlPart(string - requerido): Contenido del template cuyo contenido puede o no tener sintaxis HTML
- SubjectPart(string - requerido): Asunto con el que el template se enviará
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## get-template
### INPUTS:
- TemplateName(string - requerido): nombre que identifica al template
### OUTPUTS:
- Template(object): objecto que contiene las propiedades del template
	- TemplateName(string): nombre que identifica al template
	- HtmlPart(string): Contenido del template cuyo contenido puede o no tener sintaxis HTML
	- SubjectPart(string): Asunto con el que el template se enviará
***
## list-templates
### INPUTS:
### OUTPUTS:
- TemplatesMetadata(lista de object): lista de los templates que han sido creados
	- Name(string): nombre del template
	- CreatedTimestamp(string): fecha en la que fue creada el template
***
## verify-domain-identity
### INPUTS:
- Domain(string - requerido): dominio a ser verificado
### OUTPUTS:
- VerificationToken(string): un TXT record que debe ser ubicado en la configuración del DNS del dominio especificado https://en.wikipedia.org/wiki/TXT_record
***
## verify-email-identity
### INPUTS:
- EmailAddress(string - requerido): dirección de correo electrónico a ser verificada
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## delete-identity
### INPUTS:
- Identity(string - requerido): identity a eliminar, esta puede ser un email o domain
### OUTPUTS:
- success(boolean): indica si la operación se ejecutó exitosamente
***
## list-identities
### INPUTS:
- IdentityType(string - requerido): tipo de identity a traer, los posibles valores son: Domain, EmailAddress
### OUTPUTS:
- Identities(lista de string): una lista con las identidades existentes del tipo especificado
***
## send-email
### INPUTS:
- to(string - requerido): el correo electrónico destino, este debe ser un correo verificado en SES o perteneciente a un dominio verificado
- html(string - requerido): contenido del cuerpo del correo, este puede contener etiquetas HTML
- subject(string - requerido): asunto del correo a ser enviado
- source(string - requerido): el correo electrónico origen, este debe ser un correo verificado en SES o perteneciente a un dominio verificado
### OUTPUTS:
- MessageId(string): identificador único del correo que se acaba de enviar
***
## send-templated-email
### INPUTS:
- to(string - requerido): el correo electrónico destino, este debe ser un correo verificado en SES o perteneciente a un dominio verificado
- source(string - requerido): el correo electrónico origen, este debe ser un correo verificado en SES o perteneciente a un dominio verificado
- TemplateName(string - requerido): nombre del template que será enviado, este debe existir
- TemplateData(string - opcional): una lista de valores a reemplazar para aplicar al template. Este parámetro es un objecto JSON, cuyos llaves corresponden a variables a ser reemplazadas en el template: https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-personalized-email-api.html. Si el template tiene variables y esas no son enviadas en este parámetro, el correo no será enviado
### OUTPUTS:
- MessageId(string): identificador único del correo que se acaba de enviar
***
## get-send-statistics
### INPUTS:
### OUTPUTS:
- SendDataPoints(lista de object): lista de data points, donde cada uno representa 15 minutos de actividad
	- Timestamp(string): tiempo del data point
	- DeliveryAttempts(integer): número de emails que han sido enviados
	- Bounces(integer): número de emails que han sido rebotados
	- Complaints(integer): número de emails no deseados que fueron rechazados por el destinatario
	- Rejects(integer): número de emails rechazados por Amazon SES
***
## get-send-quota
### INPUTS:
### OUTPUTS:
- Max24HourSend(integer): el número máximo de emails que el usuario está permitido enviar en un intervalo de 24 horas
- MaxSendRate(integer): el número máximo de emails que Amazon SES puede enviar por segundo
- SentLast24Hours(integer): número de emails enviados durante las últimas 24 horas
***
