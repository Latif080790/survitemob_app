const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * setUserRole
 * 
 * A callable Cloud Function to set a custom user claim (role).
 * This function can only be called by an authenticated user who is already an admin or a PM.
 */
exports.setUserRole = functions.https.onCall(async (data, context) => {
  // 1. Authentifizierung und Autorisierungsprüfung
  // Überprüfen, ob der anfragende Benutzer authentifiziert ist
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Die Funktion kann nur von authentifizierten Benutzern aufgerufen werden."
    );
  }

  // Überprüfen, ob der anfragende Benutzer ein Admin oder PM ist
  const callerRole = context.auth.token.role;
  if (callerRole !== "admin" && callerRole !== "pm") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "Nur Admins oder Projektmanager können Benutzerrollen zuweisen."
    );
  }

  // 2. Datenvalidierung
  // Überprüfen der übergebenen Daten (uid und role)
  const { uid, role } = data;
  if (!uid || !["mandor", "qa_qc", "pm", "admin"].includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Ungültige Daten. Bitte geben Sie eine UID und eine gültige Rolle an."
    );
  }

  try {
    // 3. Benutzerdefinierte Anspruchsfestlegung (Custom Claim)
    // Setzen der benutzerdefinierten Rolle für den Zielbenutzer
    await admin.auth().setCustomUserClaims(uid, { role: role });

    // 4. Protokollierung und Erfolgsantwort
    // Optional: Protokollieren der Aktion in Firestore
    const logRef = admin.firestore().collection("user_role_logs").doc();
    await logRef.set({
      actionBy: context.auth.uid,
      targetUser: uid,
      newRole: role,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { 
      status: "success", 
      message: `Die Rolle für den Benutzer ${uid} wurde erfolgreich auf ${role} gesetzt.` 
    };

  } catch (error) {
    // 5. Fehlerbehandlung
    console.error("Fehler beim Festlegen der Benutzerrolle:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Ein interner Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
    );
  }
});
