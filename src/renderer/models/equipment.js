import { v4 as uuidv4 } from 'uuid';

class Equipment {
    constructor(
        name,
        type,
        description = '',
        userDefinedProperties = {},
        children = [],
        uuid = uuidv4(),
        dateTimeCreated = new Date(),
        dateTimeUpdated = new Date()
    ) {
        this.uuid = uuid;
        this.name = name;
        this.description = description;
        this.type = type;
        this.dateTimeCreated = dateTimeCreated;
        this.dateTimeUpdated = dateTimeUpdated;
        this.userDefinedProperties = userDefinedProperties;
        this.children = children;
    }

    updateDetails (name, description, type, userDefinedProperties) {
        if (name) this.name = name;
        if (description) this.description = description;
        if (type) this.type = type;
        if (userDefinedProperties) this.userDefinedProperties = userDefinedProperties;
        this.dateTimeUpdated = new Date();
    }

    addChild (equipment) {
        this.children.push(equipment);
    }

    removeChild (uuid) {
        this.children = this.children.filter(child => child.uuid !== uuid);
    }

    toJSON () {
        const obj = {
            uuid: this.uuid,
            name: this.name,
            description: this.description,
            type: this.type,
            dateTimeCreated: this.dateTimeCreated,
            dateTimeUpdated: this.dateTimeUpdated,
            userDefinedProperties: this.userDefinedProperties,
            children: this.children.map(child => child.uuid)
        };
        return JSON.stringify(obj, null, 2);
    }

    static fromJSON (json) {
        const obj = JSON.parse(json);
        const equipment = new Equipment(
            obj.name,
            obj.type,
            obj.description,
            obj.userDefinedProperties,
            [],
            obj.uuid,
            obj.dateTimeCreated ? new Date(obj.dateTimeCreated) : undefined,
            obj.dateTimeUpdated ? new Date(obj.dateTimeUpdated) : undefined
        );

        if (Array.isArray(obj.children)) {
            equipment.children = obj.children.map(child => Equipment.fromJSON(JSON.stringify(child)));
        }

        return equipment;
    }

    addSnapshotMetadata (metadata) {
        this.snapshotMetadata = metadata;
    }
}

export default { Equipment };
