#List of actions
- [start-instance](#start-instance)
- [stop-instance](#stop-instance)
- [terminate-instance](#terminate-instance)
- [enable-monitoring](#enable-monitoring)
- [disable-monitoring](#disable-monitoring)
- [modify-instance-attribute](#modify-instance-attribute)
- [get-console-output](#get-console-output)
- [get-console-screenshot](#get-console-screenshot)
- [allocate-elastic-ip](#allocate-elastic-ip)
- [associate-elastic-ip](#associate-elastic-ip)
- [disassociate-elastic-ip](#disassociate-elastic-ip)
- [release-elastic-ip](#release-elastic-ip)
- [create-volume](#create-volume)
- [attach-volume](#attach-volume)
- [modify-volume](#modify-volume)
- [detach-volume](#detach-volume)
- [delete-volume](#delete-volume)
- [create-image](#create-image)
- [deregister-image](#deregister-image)
- [create-snapshot](#create-snapshot)
- [delete-snapshot](#delete-snapshot)
***
#start-instance
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
## OUTPUTS:
- InstanceId(string): ID de la instancia
- CurrentState(object): estado después de ejecutar la acción
	- Code(string): código del estado
	- Name(string): nombre del estado
- PreviousState(object): estado antes de ejecutar la acción
	- Code(string): código del estado
	- Name(string): nombre del estado
***
#stop-instance
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
- Forced_stop(boolean - opcional): indica si se fuerza la ejecución de la acción sobre la instancia
## OUTPUTS:
- InstanceId(string): ID de la instancia
- CurrentState(object): estado después de ejecutar la acción
	- Code(string): código del estado
	- Name(string): nombre del estado
- PreviousState(object): estado antes de ejecutar la acción
	- Code(string): código del estado
	- Name(string): nombre del estado
***
#terminate-instance
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
## OUTPUTS:
- InstanceId(string): ID de la instancia
- CurrentState(object): estado después de ejecutar la acción
	- Code(string): código del estado
	- Name(string): nombre del estado
- PreviousState(object): estado antes de ejecutar la acción
	- Code(string): código del estado
	- Name(string): nombre del estado
***
#enable-monitoring
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
## OUTPUTS:
- InstanceId(string): ID de la instancia
- Monitoring(object): estado de monitoring de la instancia
	- State(string): estado después de ejecutar la acción
***
#disable-monitoring
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
## OUTPUTS:
- InstanceId(string): ID de la instancia
- Monitoring(object): estado de monitoring de la instancia
	- State(string): estado después de ejecutar la acción
***
#modify-instance-attribute
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
- Attribute(string - requerido): attribute a actualizar, posibles valores (instanceType | kernel | ramdisk | userData | disableApiTermination | instanceInitiatedShutdownBehavior | rootDeviceName | blockDeviceMapping | productCodes | sourceDestCheck | groupSet | ebsOptimized | sriovNetSupport | enaSupport)
- Value(string - requerido): el nuevo valor que tomará el atributo especificado
## OUTPUTS:
- success(boolean): indica si la operación se pudo ejecutar satisfactoriamente
***
#get-console-output
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
## OUTPUTS:
- InstanceId(string): ID de la instancia
- Output(string): la salida de la consola (puede ser muy larga)
- Timestamp(string): el tiempo de la última vez que la salida fue actualizada
***
#get-console-screenshot
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
## OUTPUTS:
- InstanceId(string): ID de la instancia
- ImageData(string): la data del archivo en base64
***
#allocate-elastic-ip
## INPUTS:
## OUTPUTS:
- PublicIp(string): IP pública que fue generada
- AllocationId(string): ID del elastic IP
***
#associate-elastic-ip
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia a la cual se le ejecutará la acción
- AllocationId(string - requerido): ID del elastic IP a asociar
## OUTPUTS:
- AssociationId(string): ID de la asosiación creada entre la instancia y la elastic ip
***
#disassociate-elastic-ip
## INPUTS:
- AssociationId(string - requerido): ID de la asosiación creada entre la instancia y la elastic ip
## OUTPUTS:
- success(boolean): indica si la operación se pudo ejecutar satisfactoriamente
***
#release-elastic-ip
## INPUTS:
- AllocationId(string - requerido): ID del elastic IP
## OUTPUTS:
- success(boolean): indica si la operación se pudo ejecutar satisfactoriamente
***
#create-volume
## INPUTS:
- AvailabilityZone(string - requerido): Zona en la que el volumen estará disponible
- Size(integer - requerido): Tamaño en GB del volumen a ser creado
- VolumeType(string - requerido): El tipo de volumen a ser creado, valores posibles (standard | io1 | gp2 | sc1 | st1)
## OUTPUTS:
- AvailabilityZone(string): Zona en la que fue creada el volumen
- CreateTime(string): fecha de creación registrada en AWS de la creación
- VolumeId(string): ID del volumen creado
***
#attach-volume
## INPUTS:
- Device(string - requerido): partición donde el volumen será adjuntado dentro de la instancia (ex /dev/sdf)
- Instance_ID(string - requerido): ID de la instancia al cual se le adjuntará el volumen
- VolumeId(string - requerido): ID del volumen a adjuntar
## OUTPUTS:
- AttachTime(string): Fecha en la que se adjuntó el volumen con la instancia
- Device(string): Partición donde quedó el volumen
***
#modify-volume
## INPUTS:
- VolumeId(string - requerido): ID del volumen a modificar
- VolumeType(string - opcional): El tipo de volumen, valores posibles (standard | io1 | gp2 | sc1 | st1)
- Size(integer - opcional): Tamaño en GB del volumen
## OUTPUTS:
- VolumeId(string): ID del volumen
- ModificationState(string): Estado de la operación
- TargetSize(integer): nuevo tamaño después de la modificación
- TargetVolumeType(string): nuevo tipo después de la modificación
- OriginalSize(integer): Tamaño original antes de la modificación
- OriginalVolumeType(string): Tipo de volumen original antes de la modificación
- StartTime(string): Fecha en la que la operación inició
***
#detach-volume
## INPUTS:
- VolumeId(string - requerido): ID del volumen
## OUTPUTS:
- AttachTime(string): Fecha en la que se adjuntó el volumen con la instancia
- Device(string): Partición donde quedó el volumen
- InstanceId(string): ID de la instancia sobre la cual se está desadjuntando el volumen
***
#delete-volume
## INPUTS:
- VolumeId(string - requerido): ID del volumen
## OUTPUTS:
- success(boolean): indica si la operación se pudo ejecutar satisfactoriamente
***
#create-image
## INPUTS:
- Instance_ID(string - requerido): ID de la instancia de la cual se creará la imagen
- Name(string - requerido): Nombre de la imagen a ser creada
- Description(string - opcional): breve descripción de la imagen
- NoReboot(boolean - opcional): indica si para la creación de la imagen se reinicia la instancia, por defecto, la instancia es reiniciada
## OUTPUTS:
- ImageId(string): ID de la imagen que fue creada
***
#deregister-image
## INPUTS:
- ImageId(string - requerido): ID de la imagen
## OUTPUTS:
- success(boolean): indica si la operación se pudo ejecutar satisfactoriamente
***
#create-snapshot
## INPUTS:
- VolumeId(string - requerido): ID del volumen al cual se le creará un snapshot
- Description(string - opcional): Descripción del snapshot a crear
## OUTPUTS:
- SnapshotId(string): ID del snapshot creado
- VolumeId(string): ID del volumen del snapshot
- VolumeSize(integer): Tamaño del volumen
- StartTime(string): Fecha en la inició el proceso de generación de snaphot
***
#delete-snapshot
## INPUTS:
- SnapshotId(string - requerido): ID del snapshot
## OUTPUTS:
- success(boolean): indica si la operación se pudo ejecutar satisfactoriamente
***
