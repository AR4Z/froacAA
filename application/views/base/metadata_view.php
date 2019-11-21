<?php
$lo_xml = $xml[0]["lo_xml_lom"];
$xml_dom = new DOMDocument();
$xml_dom->loadXML($lo_xml);
echo '<h3>General</h3>';
$catalog = $xml_dom->getElementsByTagName('catalog')[0]->textContent;
echo '<b>Catalogo: </b>' . $catalog . '<br/>';
$entry = $xml_dom->getElementsByTagName('entry')[0]->textContent;
echo '<b>Entrada: </b>' . $entry . '<br/>';
$title = $xml_dom->getElementsByTagName('title')[0]->textContent;
echo '<b>Título: </b>' . $title . '<br/>';
$language = $xml_dom->getElementsByTagName('language')[0]->textContent;
echo '<b>Lenguage: </b>' . $language . '<br/>';
$description = $xml_dom->getElementsByTagName('description')[0]->textContent;
echo '<b>Descripción: </b>' . $description . '<br/>';
$gral_tag = $xml_dom->getElementsByTagName('general')[0];
$gral_keywords_tags = $gral_tag->getElementsByTagName('keyword');
$coverage = $xml_dom->getElementsByTagName('coverage')[0]->textContent;
echo '<b>Cobertura: </b>' . $coverage . '<br/>';
$structure = $xml_dom->getElementsByTagName('structure')[0]->textContent;
echo '<b>Estructura: </b>' . $structure . '<br/>';
$aggregation_level = $xml_dom->getElementsByTagName('aggregationlevel')[0]->textContent;
echo '<b>Nivel de agregación: </b>' . $aggregation_level . '<br/>';
$gral = $xml_dom->getElementsByTagName('general');

if ($gral->length) {
	$gral_keywords = $gral[0]->getElementsByTagName('keyword');
	if ($gral_keywords->length) {
		echo '<b>Palabras clave: </b> <br/><ul>';
		foreach ($gral_keywords as $key => $kw) {
			echo '<li>' . $kw->textContent . '</li>';
		}
		echo '</ul>';
	}
}
$lifecycle = $xml_dom->getElementsByTagName('lifecycle');
if ($lifecycle->length) {
	echo '<h3>Ciclo de vida</h3>';
	$lifecycle_version = $lifecycle[0]->getElementsByTagName('version');
	$lifecycle_status = $lifecycle[0]->getElementsByTagName('status');
	$lifecycle_contribute = $lifecycle[0]->getElementsByTagName('contribute');

	if ($lifecycle_version->length) {
		echo '<b>Versión: </b>' . $lifecycle_version[0]->textContent . '<br/>';
	}

	if ($lifecycle_status->length) {
		echo '<b>Status: </b>' . $lifecycle_status[0]->textContent . '<br/>';
	}

	if ($lifecycle_contribute->length) {
		$contribute_role = $lifecycle_contribute[0]->getElementsByTagName('role');
		$contribute_date = $lifecycle_contribute[0]->getElementsByTagName('date');
		$contribute_entity = $lifecycle_contribute[0]->getElementsByTagName('entity');

		if ($contribute_role->length) {
			echo '<b>Rol: </b>' . $contribute_role[0]->textContent . '<br/>';
		}

		if ($contribute_entity->length) {
			echo '<b>Entidad: </b>' . $contribute_entity[0]->textContent . '<br/>';
		}

		if ($contribute_date->length) {
			echo '<b>Fecha: </b>' . $contribute_date[0]->textContent . '<br/>';
		}
	}
}

$metametadata = $xml_dom->getElementsByTagName('metametadata');
if ($metametadata->length) {
	echo '<h3>Metadata</h3>';

	$metametadata_identifier = $metametadata[0]->getElementsByTagName('identifier');
	$metametadata_contribute = $metametadata[0]->getElementsbyTagName('contribute');
	$metametadata_schema = $metametadata[0]->getElementsByTagName('metadataschema');
	$metametadata_lang = $metametadata[0]->getElementsByTagName('language');

	if ($metametadata_identifier->length) {
		$identifier_catalog = $metametadata_identifier[0]->getElementsByTagName('catalog');
		$identifier_entry = $metametadata_identifier[0]->getElementsByTagName('entry');

		if ($identifier_catalog->length) {
			echo '<b>Catalogo: </b>' . $identifier_catalog[0]->textContent . '<br/>';
		}

		if ($identifier_entry->length) {
			echo '<b>Entrada: </b>' . $identifier_entry[0]->textContent . '<br/>';
		}
	}

	if ($metametadata_contribute->length) {
		$contribute_role = $metametadata_contribute[0]->getElementsByTagName('role');
		$contribute_entity = $metametadata_contribute[0]->getElementsByTagName('entity');
		$contribute_date = $metametadata_contribute[0]->getElementsByTagName('date');
	}

	if ($metametadata_schema->length) {
		echo '<b>Esquema de metadatos: </b>' . $metametadata_schema[0]->textContent . '<br/>';
	}

	if ($metametadata_lang->length) {
		echo '<b>Lenguaje: </b>' . $metametadata_lang[0]->textContent . '<br/>';
	}
}

$technical = $xml_dom->getElementsByTagName('technical');
if ($technical->length) {
	echo '<h3>Técnico</h3>';

	$technical_format = $technical[0]->getElementsByTagName('format');
	$technical_size = $technical[0]->getElementsByTagName('size');
	$technical_location = $technical[0]->getElementsByTagName('location');
	$technical_type = $technical[0]->getElementsByTagName('type');
	$technical_name = $technical[0]->getElementsByTagName('name');
	$technical_minimum_version = $technical[0]->getElementsByTagName('minimumversion');
	$technical_maximum_version = $technical[0]->getElementsByTagName('maximumversion');
	$technical_installation_remarks = $technical[0]->getElementsByTagName('installationremarks');
	$technical_otherplatformrequirements = $technical[0]->getElementsByTagName('otherplatformrequirements');
	$technical_duration = $technical[0]->getElementsByTagName('duration');


	if ($technical_format->length) {
		echo '<b>Formato: </b>' . $technical_format[0]->textContent . '<br/>';
	}

	if ($technical_size->length) {
		echo '<b>Tamaño: </b>' . $technical_size[0]->textContent . '<br/>';
	}

	if ($technical_location->length) {
		echo '<b>Localización: </b>' . $technical_location[0]->textContent . '<br/>';
	}

	if ($technical_type->length) {
		var_dump($technical_type[0]);
		echo '<b>Tipo: </b>' . $technical_type[0]->textContent . '<br/>';
	}

	if ($technical_name->length) {
		echo '<b>Nombre: </b>' . $technical_name[0]->textContent . '<br/>';
	}

	if ($technical_minimum_version->length) {
		echo '<b>Versión mínima: </b>' . $technical_minimum_version[0]->textContent . '<br/>';
	}

	if ($technical_maximum_version->length) {
		echo '<b>Versión máxima: </b>' . $technical_maximum_version[0]->textContent . '<br/>';
	}

	if ($technical_installation_remarks->length) {
		echo '<b>Observaciones de instalación: </b>' . $technical_installation_remarks[0]->textContent . '<br/>';
	}

	if ($technical_otherplatformrequirements->length) {
		echo '<b>Otras plataformas requeridas: </b>' . $technical_otherplatformrequirements[0]->textContent . '<br/>';
	}

	if ($technical_duration->length) {
		echo '<b>Duración: </b>' . $technical_duration[0]->textContent . '<br/>';
	}
}

$educational = $xml_dom->getElementsByTagName('educational');

if ($educational->length) {
	echo '<h3>Educativo</h3>';

	$educational_interactivitytype = $educational[0]->getElementsByTagName('interactivitytype');
	$educational_learningresourcetype = $educational[0]->getElementsByTagName('learningresourcetype');
	$educational_interactivitylevel = $educational[0]->getElementsByTagName('interactivitylevel');
	$educational_semanticdensity = $educational[0]->getElementsByTagName('semanticdensity');
	$educational_intendedenduserrole = $educational[0]->getElementsByTagName('intendedenduserrole');
	$educational_context = $educational[0]->getElementsByTagName('context');
	$educational_typicalagerange = $educational[0]->getElementsByTagName('typicalagerange');
	$educational_difficulty = $educational[0]->getElementsByTagName('difficulty');
	$educational_typicallearningtime = $educational[0]->getElementsByTagName('typicallearningtime');
	$educational_description = $educational[0]->getElementsByTagName('description');
	$educational_language = $educational[0]->getElementsByTagName('language');


	if ($educational_interactivitytype->length) {
		echo '<b>Tipo de interactividad: </b>' . $educational_interactivitytype[0]->textContent . '<br/>';
	}

	if ($educational_learningresourcetype->length) {
		echo '<b>Tipo de recurso de aprendizaje: </b>' . $educational_learningresourcetype[0]->textContent . '<br/>';
	}

	if ($educational_interactivitylevel->length) {
		echo '<b>Nivel de interactividad: </b>' . $educational_interactivitylevel[0]->textContent . '<br/>';
	}

	if ($educational_semanticdensity->length) {
		echo '<b>Densidad semántica: </b>' . $educational_semanticdensity[0]->textContent . '<br/>';
	}

	if ($educational_intendedenduserrole->length) {
		echo '<b>Rol del usuario final previsto: </b>' . $educational_intendedenduserrole[0]->textContent . '<br/>';
	}

	if ($educational_context->length) {
		echo '<b>Contexto: </b>' . $educational_context[0]->textContent . '<br/>';
	}

	if ($educational_typicalagerange->length) {
		echo '<b>Rango típico de edad: </b>' . $educational_typicalagerange[0]->textContent . '<br/>';
	}

	if ($educational_difficulty->length) {
		echo '<b>Dificultad: </b>' . $educational_difficulty[0]->textContent . '<br/>';
	}

	if ($educational_typicallearningtime->length) {
		echo '<b>Tiempo típico de aprendizaje: </b>' . $educational_typicallearningtime[0]->textContent . '<br/>';
	}

	if ($educational_description->length) {
		echo '<b>Descripción: </b>' . $educational_description[0]->textContent . '<br/>';
	}

	if ($educational_language->length) {
		echo '<b>Lenguaje: </b>' . $educational_language[0]->textContent . '<br/>';
	}
}

$rights = $xml_dom->getElementsbyTagName('rights');
if ($rights->length) {
	echo '<h3>Derechos</h3>';

	$rights_cost = $rights[0]->getElementsByTagName('cost');
	$rights_copyrightandotherrestrictions = $rights[0]->getElementsByTagName('copyrightandotherrestrictions');
	$rights_description = $rights[0]->getElementsByTagName('description');

	if ($rights_cost->length) {
		echo '<b>Costo: </b>' . $rights_cost[0]->textContent . '<br/>';
	}

	if ($rights_copyrightandotherrestrictions->length) {
		echo '<b>Copyright y otras restricciones: </b>' . $rights_copyrightandotherrestrictions[0]->textContent . '<br/>';
	}

	if ($rights_description->length) {
		echo '<b>Descripción: </b>' . $rights_description[0]->textContent . '<br/>';
	}
}

$relation = $xml_dom->getElementsByTagName('relation');
if ($relation->length) {
	echo '<h3>Relación</h3>';

	$relation_kind = $relation[0]->getElementsByTagName('kind');
	$relation_catalog = $relation[0]->getElementsByTagName('catalog');
	$relation_entry = $relation[0]->getElementsByTagName('entry');
	$relation_description = $relation[0]->getElementsByTagName('description');

	if ($relation_kind->length) {
		echo '<b>Clase: </b>' . $relation_kind[0]->textContent . '<br/>';
	}

	if ($relation_catalog->length) {
		echo '<b>Catalogo: </b>' . $relation_catalog[0]->textContent . '<br/>';
	}
	if ($relation_entry->length) {
		echo '<b>Entrada: </b>' . $relation_entry[0]->textContent . '<br/>';
	}
	if ($relation_description->length) {
		echo '<b>Descripción: </b>' . $relation_description[0]->textContent . '<br/>';
	}
}

$annotation = $xml_dom->getElementsByTagName('annotation');
if ($annotation->length) {
	echo '<h3>Anotaciones</h3>';

	$annotation_entity = $annotation[0]->getElementsByTagName('entity');
	$annotation_date = $annotation[0]->getElementsByTagName('date');
	$annotation_description = $annotation[0]->getElementsByTagName('description');


	if ($annotation_entity->length) {
		echo '<b>Entidad: </b>' . $annotation_entity[0]->textContent . '<br/>';
	}

	if ($annotation_date->length) {
		echo '<b>Fecha: </b>' . $annotation_date[0]->textContent . '<br/>';
	}

	if ($annotation_description->length) {
		echo '<b>Descripción: </b>' . $annotation_description[0]->textContent . '<br/>';
	}
}

$classification = $xml_dom->getElementsByTagName('classification');
if ($classification->length) {
	echo '<h3>Clasificación</h3>';

	$classification_purpose = $classification[0]->getElementsByTagName('purpose');
	$classification_source = $classification[0]->getElementsByTagName('source');
	$classification_id = $classification[0]->getElementsByTagName('id');
	$classification_entry = $classification[0]->getElementsByTagName('entry');
	$classification_description = $classification[0]->getElementsByTagName('description');
	$classification_keywords = $classification[0]->getElementsByTagName('keyword');


	if ($classification_purpose->length) {
		echo '<b>Propósito: </b>' . $classification_purpose[0]->textContent . '<br/>';
	}

	if ($classification_source->length) {
		echo '<b>Fuente: </b>' . $classification_source[0]->textContent . '<br/>';
	}

	if ($classification_id->length) {
		echo '<b>Identificación: </b>' . $classification_id[0]->textContent . '<br/>';
	}

	if ($classification_entry->length) {
		echo '<b>Entrada: </b>' . $classification_entry[0]->textContent . '<br/>';
	}

	if ($classification_description->length) {
		echo '<b>Descripción: </b>' . $classification_description[0]->textContent . '<br/>';
	}

	if ($classification_keywords->length) {
		echo '<b>Palabras clave: </b> <br/><ul>';
		foreach ($gral_keywords as $key => $kw) {
			echo '<li>' . $kw->textContent . '</li>';
		}
		echo '</ul>';
	}
}
