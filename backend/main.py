from flask import request, jsonify
from config import app, db

from models import Contact

@app.route("/contacts", methods=["GET"])
def get_contacts():
    print("get contacts")
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({ "contacts": json_contacts })


@app.route("/create_contact", methods=["POST"])
def create_contact():
    print("Start request to create a new contact")
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if None in [first_name, last_name, email]:
        print("Parameters are missing")
        return jsonify({"message": "Invalid fields"}), 400
    
    print("Parameters are correct")
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        print("Creating a new contact")
        db.session.add(new_contact)
        db.session.commit()
        
    except Exception as e:
        print("Error when creating a new contact")
        print(str(e))
        return jsonify({"message": str(e)}), 500
    
    return jsonify({"message": "user created", "user": new_contact.to_json()}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "user not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    try:
        print("Update contact")
        db.session.commit()
        
    except Exception as e:
        print("Error when updating contact")
        print(str(e))
        return jsonify({"message": str(e)}), 500
    
    return jsonify({"message": "user updated", "user": contact.to_json()}), 201
    

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)

    if not contact:
        return jsonify({"message": "user not found"}), 404
    try:
        print("Delete contact")
        db.session.delete(contact)
        db.session.commit()
        
    except Exception as e:
        print("Error when deleting contact")
        print(str(e))
        return jsonify({"message": str(e)}), 500
    
    return jsonify({"message": "user deleted"}), 200


if __name__ == "__main__":
    print("Running app")
    with app.app_context():
        db.create_all()

    app.run(debug=True)
