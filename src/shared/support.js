import {
	
		
 	
		
 	 							// For Nested APIs / Join tables			
	 	 							// For Nested APIs / Join tables			
	 	
		
 	
		
 	
		
 	 	 	 	 	
		
 	 	
	
 	
		
 	 							// For Nested APIs / Join tables			
	 	   SetIncentiveSingle, SetAgentSingle, SetAgentLeadsJoin, SetAgentKYCDocsJoin, SetUserSingle, SetIncentiveSEExecSingle, SetLeadSingle, SetHOUserSingle, SetDocumentSingleMedia, SetSalesExecutiveSingle, SetSalesExecutiveSELeadsJoin
} from "./services";
import Helper from "shared/helper";

var fn = {};

const defaultError = "Something went wrong while processing request!";

		
     
fn.AddOrUpdateIncentive = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetIncentiveSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateAgent = async (input, enums, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (x.type === 'dropdown') {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m[x.valueId]) === parseInt(x.value))[x.valueId];
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetAgentSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateAgentLeads = async (LeadId, AgentID, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: LeadId, Deleted: input.Deleted };
            rslt = await SetAgentLeadsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, LeadId: input.LeadId });
            }

            data = { LeadId: input.LeadId, Deleted: input.Deleted };

            rslt = await SetLeadSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, LeadId: input.LeadId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetLeadSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: LeadId, LeadId: id, AgentID };
                rslt = await SetAgentLeadsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateAgentKYCDocs = async (DocId, AgentID, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: DocId, Deleted: input.Deleted };
            rslt = await SetAgentKYCDocsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, DocId: input.DocId });
            }

            data = { DocId: input.DocId, Deleted: input.Deleted };

            rslt = await SetDocumentSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, DocId: input.DocId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetDocumentSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: DocId, DocId: id, AgentID };
                rslt = await SetAgentKYCDocsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateUser = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetUserSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateIncentiveSEExec = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetIncentiveSEExecSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateLead = async (input, enums, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    if (x.type === 'dropdown') {
                        data[x.key] = enums.find((z) => z.Name === x.source).Values.find((m) => parseInt(m[x.valueId]) === parseInt(x.value))[x.valueId];
                    } else {
                        data[x.key] = x.value;
                    }
                }
            });

        global.Busy(true);
        let rslt = await SetLeadSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateHOUser = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetHOUserSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		

fn.AddOrUpdateDocument = async (input) => {
    return new Promise(async (resolve) => {
        let status = false, id = null;
        const { 
        DocId,
        Name,
        Type,
        Path,
        Attribute1
        , DocData
        } = input.value;
        global.Busy(true);
        let rslt = await SetDocumentSingleMedia(DocData, { 
        Name,
        Type,
        Path,
        Attribute1
        , DocId: DocId });
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
};

		
     
fn.AddOrUpdateSalesExecutive = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetSalesExecutiveSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateSalesExecutiveSELeads = async (LeadId, ExecId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: LeadId, Deleted: input.Deleted };
            rslt = await SetSalesExecutiveSELeadsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, LeadId: input.LeadId });
            }

            data = { LeadId: input.LeadId, Deleted: input.Deleted };

            rslt = await SetLeadSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, LeadId: input.LeadId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetLeadSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: LeadId, LeadId: id, ExecId };
                rslt = await SetSalesExecutiveSELeadsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}




export default fn;
