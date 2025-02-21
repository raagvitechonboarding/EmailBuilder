import { LightningElement, track, wire } from 'lwc';
import fetchAllObject from '@salesforce/apex/EmailTemplateController.fetchAllObject';
import fetchSobjectFields from '@salesforce/apex/EmailTemplateController.fetchSobjectFields';
import getSobjectEmailTemplates from '@salesforce/apex/EmailTemplateController.getSobjectEmailTemplates';



export default class MergeField extends LightningElement {

    optObject;
    allRecord;
    options;
    objectFields;
    optObjectField;
    optionsField;
    objectFieldRecord;
    templateRecords;
    templateId;
    templateContent;
    templateSubject;
    badgeClass = 'badge-blue';

    @wire(fetchAllObject)
    wiredFetchObject({ data, error }) {
        if (data) {
            this.allRecord = data;
            this.options = this.allRecord.map(value => ({ label: value, value: value })).sort((a, b) => a.label.localeCompare(b.label));
        }
        else if (error) {
            this.error = error;
        }
    }

    handleKeyChange(event) {
        this.optObject = event.target.value;
        this.handleObjectFields();
        this.handleEmailTemplate();
    }

    async handleObjectFields() {
        this.objectFields = await fetchSobjectFields({ objectName: this.optObject });
        this.objectFieldRecord = Object.entries(this.objectFields).map(([objectLabel, objectFieldApiName]) => ({
            objectLabel,
            objectFieldApiName
        }));
        this.optionsField = this.objectFieldRecord.map(item => {
            return {
                label: item.objectLabel,
                value: item.objectFieldApiName
            }
        })
    }

    async handleEmailTemplate() {
        this.templateRecords = await getSobjectEmailTemplates({ objectName: this.optObject });
    }

    handleFieldChange(event) {
        this.optObjectField = event.target.value;
    }

    handleTemplate(event){
        this.templateId = event.target.dataset.id;
        this.badgeClass = this.badgeClass === 'badge-blue' ? 'badge-green' : 'badge-blue';
        this.templateContent = event.target.dataset.value;
        this.templateSubject = event.target.dataset.subject;
        console.log('+++++++++templateId+++++++++ ', JSON.stringify(this.templateId));
        console.log('+++++++++templateContent+++++++++ ', JSON.stringify(this.templateContent));
    }
}